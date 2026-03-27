import { useEffect, useRef, useCallback, useMemo, useState, lazy, Suspense } from 'react'
import { useStore } from '../../store'
import ProductSkeleton from './ProductSkeleton'
import { API_URL, sortProducts } from '../../utils/utils'
import { useDebounce } from '../../hooks/useDebounce'

const ProductItem = lazy(() => import('./ProductItem'))

export interface Product {
  id: string
  creator: string
  title: string
  pricingOption: number
  imagePath: string
  price: number
}

export const pricingOption: Record<number, string> = {
  0: 'PAID',
  1: 'FREE',
  2: 'VIEW_ONLY',
}

const ProductList = () => {
  const { state, dispatch } = useStore()
  const { product, filter } = state
  const { allData, showData, pageSize, loading } = product
  const { selectedFilters, searchTerm, priceRange } = filter

  const [sort, setSort] = useState('item-name')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const observerTarget = useRef<HTMLDivElement>(null)

  const fetchData = async () => {
    if (loading) return
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const response = await fetch(API_URL)
      const data: Product[] = await response.json()
      dispatch({ type: 'SET_ALL_DATA', payload: data })
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredData = useMemo(() => {
    let filtered = allData

    if (debouncedSearchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter((item) => selectedFilters.includes(item.pricingOption))
    }

    filtered = filtered.filter((item) => {
      if (item.pricingOption !== 0) return true
      return item.price >= priceRange[0] && item.price <= priceRange[1]
    })

    return sortProducts(filtered, sort)
  }, [allData, debouncedSearchTerm, selectedFilters, sort, priceRange])

  useEffect(() => {
    if (filteredData.length > 0) {
      const firstPage = filteredData.slice(0, pageSize)
      dispatch({ type: 'SET_SHOW_DATA', payload: firstPage })
    }
  }, [sort, filteredData, pageSize])

  const loadMoreProducts = useCallback(() => {
    if (loading) return
    if (showData.length >= filteredData.length) return

    dispatch({ type: 'SET_LOADING', payload: true })

    setTimeout(() => {
      const nextIndex = showData.length
      const newProducts = filteredData.slice(nextIndex, nextIndex + pageSize)
      dispatch({ type: 'APPEND_SHOW_DATA', payload: newProducts })
      dispatch({ type: 'SET_LOADING', payload: false })
    }, 300)
  }, [loading, showData.length, filteredData, pageSize])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && !loading && showData.length < filteredData.length) {
        loadMoreProducts()
      }
    },
    [loading, loadMoreProducts, showData.length, filteredData.length]
  )

  useEffect(() => {
    const option: IntersectionObserverInit = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <div className="product-list">
      <div className='product-sort'>
        <div className='dropdown'>
          <span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
            <option value="item-name">Item Name</option>
            <option value="high-price">High Price</option>
            <option value="low-price">Low Price</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {loading && showData.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          showData.map((product) => (
            <Suspense key={product.id} fallback={<div>Loading...</div>}>
              <ProductItem product={product} />
            </Suspense>
          ))
        )}
      </div>
      <div ref={observerTarget} className="load-more-trigger">
        {loading && showData.length > 0 && <div className="loading">Loading more products...</div>}
        {!loading && showData.length >= filteredData.length && allData.length > 0 && (
          <div className="no-more">No more products</div>
        )}
        {!loading && showData.length === 0 && allData.length > 0 && (
          <div className="no-more">No products found</div>
        )}
      </div>
    </div>
  )
}

export default ProductList