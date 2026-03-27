import { appReducer, initialState } from '../reducer'
import { Product } from '../../components/productlist/ProductList'

const mockProducts: Product[] = [
  {
    id: '1',
    creator: 'creator1',
    title: 'Product 1',
    pricingOption: 0,
    imagePath: '/image1.jpg',
    price: 100,
  },
  {
    id: '2',
    creator: 'creator2',
    title: 'Product 2',
    pricingOption: 1,
    imagePath: '/image2.jpg',
    price: 0,
  },
  {
    id: '3',
    creator: 'creator3',
    title: 'Product 3',
    pricingOption: 0,
    imagePath: '/image3.jpg',
    price: 200,
  },
]

describe('appReducer', () => {
  test('should return initial state', () => {
    expect(appReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState)
  })

  test('should handle SET_ALL_DATA', () => {
    const action = { type: 'SET_ALL_DATA', payload: mockProducts }
    const newState = appReducer(initialState, action)

    expect(newState.product.allData).toEqual(mockProducts)
    expect(newState.product.showData).toEqual(mockProducts.slice(0, 10))
  })

  test('should handle SET_LOADING', () => {
    const action = { type: 'SET_LOADING', payload: true }
    const newState = appReducer(initialState, action)

    expect(newState.product.loading).toBe(true)
  })

  test('should handle SET_FILTERS', () => {
    const stateWithData = {
      ...initialState,
      product: {
        ...initialState.product,
        allData: mockProducts,
      },
    }
    const action = { type: 'SET_FILTERS', payload: [0] }
    const newState = appReducer(stateWithData, action)

    expect(newState.filter.selectedFilters).toEqual([0])
    expect(newState.product.showData.length).toBeGreaterThan(0)
  })

  test('should handle SET_SEARCH_TERM', () => {
    const stateWithData = {
      ...initialState,
      product: {
        ...initialState.product,
        allData: mockProducts,
      },
    }
    const action = { type: 'SET_SEARCH_TERM', payload: 'Product 1' }
    const newState = appReducer(stateWithData, action)

    expect(newState.filter.searchTerm).toBe('Product 1')
    expect(newState.product.showData.length).toBe(1)
  })

  test('should handle SET_PRICE_RANGE', () => {
    const stateWithData = {
      ...initialState,
      product: {
        ...initialState.product,
        allData: mockProducts,
      },
    }
    const action = { type: 'SET_PRICE_RANGE', payload: [50, 150] }
    const newState = appReducer(stateWithData, action)

    expect(newState.filter.priceRange).toEqual([50, 150])
  })
})