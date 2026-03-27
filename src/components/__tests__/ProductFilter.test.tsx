import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductFilter from '../ProductFilter'
import { StoreProvider } from '../../store'

const mockStore = {
  state: {
    product: {
      allData: [],
      showData: [],
      pageSize: 10,
      loading: false,
    },
    filter: {
      selectedFilters: [],
      selectedSort: 'name-asc',
      searchTerm: '',
      priceRange: [0, 1000],
    },
  },
  dispatch: jest.fn(),
}

jest.mock('../../store', () => ({
  useStore: () => mockStore,
  StoreProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('../SearchIcon', () => () => <div data-testid="search-icon">SearchIcon</div>)
jest.mock('../PriceSlider', () => ({ }: any) => (
  <div data-testid="price-slider">PriceSlider</div>
))

describe('ProductFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockStore.state.filter.selectedFilters = []
    mockStore.state.filter.searchTerm = ''
    mockStore.state.filter.priceRange = [0, 1000]
  })

  test('should render search input', () => {
    render(
      <StoreProvider>
        <ProductFilter />
      </StoreProvider>
    )

    const searchInput = screen.getByPlaceholderText("Find: items you're looking for")
    expect(searchInput).toBeInTheDocument()
  })

  test('should render pricing option checkboxes', () => {
    render(
      <StoreProvider>
        <ProductFilter />
      </StoreProvider>
    )

    expect(screen.getByText('Pricing Option')).toBeInTheDocument()
    expect(screen.getByText('PAID')).toBeInTheDocument()
    expect(screen.getByText('FREE')).toBeInTheDocument()
    expect(screen.getByText('VIEW_ONLY')).toBeInTheDocument()
  })

  test('should render reset button', () => {
    render(
      <StoreProvider>
        <ProductFilter />
      </StoreProvider>
    )

    expect(screen.getByText('RESET')).toBeInTheDocument()
  })

  test('should handle search input change', () => {
    render(
      <StoreProvider>
        <ProductFilter />
      </StoreProvider>
    )

    const searchInput = screen.getByPlaceholderText("Find: items you're looking for")
    fireEvent.change(searchInput, { target: { value: 'test search' } })

    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH_TERM', payload: 'test search' })
  })

  test('should handle filter checkbox change', () => {
    render(
      <StoreProvider>
        <ProductFilter />
      </StoreProvider>
    )

    const paidLabel = screen.getByText('PAID').closest('label')
    const paidCheckbox = paidLabel?.querySelector('input[type="checkbox"]') as HTMLInputElement
    if (paidCheckbox) {
      fireEvent.click(paidCheckbox)
    }

    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'SET_FILTERS', payload: [0] })
  })

  test('should handle reset button click', () => {
    render(
      <StoreProvider>
        <ProductFilter />
      </StoreProvider>
    )

    const resetButton = screen.getByText('RESET')
    fireEvent.click(resetButton)

    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'SET_FILTERS', payload: [] })
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH_TERM', payload: '' })
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'SET_PRICE_RANGE', payload: [0, 1000] })
  })
})