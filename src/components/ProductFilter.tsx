import { useStore } from '../store'
import { pricingOption } from './productlist/ProductList'
import SearchIcon from './SearchIcon'
import PriceSlider from './PriceSlider'

const ProductFilter = () => {
  const { state, dispatch } = useStore()
  const { selectedFilters, searchTerm, priceRange } = state.filter

  const updateURL = (filters: number[], search: string) => {
    const params = new URLSearchParams(window.location.search)
    if (filters.length > 0) {
      params.set('filters', filters.join(','))
    } else {
      params.delete('filters')
    }
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    const newURL = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newURL)
  }

  const handleFilterChange = (option: number) => {
    const newFilters = selectedFilters.includes(option)
      ? selectedFilters.filter((f) => f !== option)
      : [...selectedFilters, option]
    dispatch({ type: 'SET_FILTERS', payload: newFilters })
    updateURL(newFilters, searchTerm)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    dispatch({ type: 'SET_SEARCH_TERM', payload: newSearchTerm })
    updateURL(selectedFilters, newSearchTerm)
  }

  const handlePriceRangeChange = (newPriceRange: [number, number]) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: newPriceRange })
  }

  const handleReset = () => {
    dispatch({ type: 'SET_FILTERS', payload: [] })
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' })
    dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 1000] })
    updateURL([], '')
  }

  const filterOptions = Object.keys(pricingOption).map(Number)

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Find: items you're looking for"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <span className="search-icon">
          <SearchIcon />
        </span>
      </div>

      <div className="filter-container">
        <div className="filter-content">
          <div className="pricing-option">
            <span className="option-label">Pricing Option</span>
            {filterOptions.map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(option)}
                  onChange={() => handleFilterChange(option)}
                />
                {pricingOption[option]}
              </label>
            ))}
          </div>
          <PriceSlider priceRange={priceRange} onPriceRangeChange={handlePriceRangeChange} />
          <button className="reset-btn" onClick={handleReset}>
            RESET
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductFilter