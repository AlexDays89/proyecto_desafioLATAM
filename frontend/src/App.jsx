import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Routes
import { AppRoutes } from './routes'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className='App'>
            <AppRoutes />

            {/* Toast Notifications */}
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
