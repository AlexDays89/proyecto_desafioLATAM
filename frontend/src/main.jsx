import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// PrimeReact y PrimeIcons CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// FontAwesome CSS para iconos
import '@fortawesome/fontawesome-free/css/all.min.css';
// Importar efecto de cursor personalizado
import './cursorEffect.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
