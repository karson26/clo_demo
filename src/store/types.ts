import { Product } from '../components/productlist/ProductList'

export interface ProductState {
  allData: Product[]
  showData: Product[]
  pageSize: number
  loading: boolean
}

export interface FilterState {
  selectedFilters: number[]
  selectedSort: string
  searchTerm: string
  priceRange: [number, number]
}

export interface AppState {
  product: ProductState
  filter: FilterState
}

export type AppAction =
  | { type: 'SET_ALL_DATA'; payload: Product[] }
  | { type: 'SET_SHOW_DATA'; payload: Product[] }
  | { type: 'APPEND_SHOW_DATA'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FILTERS'; payload: number[] }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }