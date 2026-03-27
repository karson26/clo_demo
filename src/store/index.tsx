import { createContext, useContext, ReactNode, useEffect } from 'react'
import { useReducer } from 'react'
import { AppState, AppAction } from './types'
import { appReducer, initialState } from './reducer'

interface StoreContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

interface StoreProviderProps {
  children: ReactNode
}

const getInitialStateFromURL = (): AppState => {
  const params = new URLSearchParams(window.location.search)
  const filtersParam = params.get('filters')
  const searchParam = params.get('search')

  const selectedFilters = filtersParam
    ? filtersParam.split(',').map(Number).filter((n) => !isNaN(n))
    : []
  const searchTerm = searchParam || ''

  return {
    ...initialState,
    filter: {
      ...initialState.filter,
      selectedFilters,
      searchTerm,
    },
  }
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(appReducer, getInitialStateFromURL())

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const filtersParam = params.get('filters')
      const searchParam = params.get('search')

      const selectedFilters = filtersParam
        ? filtersParam.split(',').map(Number).filter((n) => !isNaN(n))
        : []
      const searchTerm = searchParam || ''

      dispatch({ type: 'SET_FILTERS', payload: selectedFilters })
      dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [dispatch])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}