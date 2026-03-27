import { produce } from 'immer'
import { AppState, AppAction } from './types'

export const initialState: AppState = {
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
}

const filterAndSetShowData = (state: AppState) => {
  const { allData, pageSize } = state.product
  const { selectedFilters, searchTerm, priceRange } = state.filter

  let filtered = allData

  if (searchTerm) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  if (selectedFilters.length > 0) {
    filtered = filtered.filter((item) => selectedFilters.includes(item.pricingOption))
  }

  filtered = filtered.filter((item) => {
    if (item.pricingOption !== 0) return true
    return item.price >= priceRange[0] && item.price <= priceRange[1]
  })

  state.product.showData = filtered.slice(0, pageSize)
}

const actions = {
  SET_ALL_DATA: (state: AppState, action: AppAction) => {
    if (action.type === 'SET_ALL_DATA') {
      state.product.allData = action.payload
      state.product.showData = action.payload.slice(0, state.product.pageSize)
    }
  },
  SET_SHOW_DATA: (state: AppState, action: AppAction) => {
    if (action.type === 'SET_SHOW_DATA') {
      state.product.showData = action.payload
    }
  },
  APPEND_SHOW_DATA: (state: AppState, action: AppAction) => {
    if (action.type === 'APPEND_SHOW_DATA') {
      state.product.showData = [...state.product.showData, ...action.payload]
    }
  },
  SET_LOADING: (state: AppState, action: AppAction) => {
    if (action.type === 'SET_LOADING') {
      state.product.loading = action.payload
    }
  },
  SET_FILTERS: (state: AppState, action: AppAction) => {
    if (action.type === 'SET_FILTERS') {
      state.filter.selectedFilters = action.payload
      filterAndSetShowData(state)
    }
  },
  SET_SORT: (state: AppState, action: AppAction) => {
    if (action.type === 'SET_SORT') {
      state.filter.selectedSort = action.payload
    }
  },
  SET_SEARCH_TERM: (state: AppState, action: AppAction) => {
    if (action.type === 'SET_SEARCH_TERM') {
      state.filter.searchTerm = action.payload
      filterAndSetShowData(state)
    }
  },
  SET_PRICE_RANGE: (state: AppState, action: AppAction) => {
    if (action.type === 'SET_PRICE_RANGE') {
      state.filter.priceRange = action.payload
      filterAndSetShowData(state)
    }
  },
}

export function appReducer(state: AppState, action: AppAction): AppState {
  const currentState = state || initialState
  return produce(currentState, (draft) => {
    const handler = actions[action.type as keyof typeof actions]
    if (handler) {
      handler(draft, action)
    }
  })
}