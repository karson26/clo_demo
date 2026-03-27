import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from './store/index'
import Home from './pages/Home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <Home />
    </StoreProvider>
  </StrictMode>,
)