import './main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { enableMocking } from './config/environment'
import App from './App.jsx'

const renderApp = () => {
  const rootElement = document.getElementById('root')
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

enableMocking()
  .then(renderApp)
  .catch(console.error)
