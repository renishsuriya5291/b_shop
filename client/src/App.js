import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

// Import slices
import { initializeAuth } from './store/slices/authSlice'

// Import components
import Navbar from './components/common/Navbar'
import LoadingSpinner from './components/common/LoadingSpinner'

// Import pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import ShopDetails from './pages/customer/ShopDetails'
import BarberDashboard from './pages/barber/BarberDashboard'
import CreateShop from './pages/barber/CreateShop'
import ProfilePage from './pages/ProfilePage'

// Protected Route Component
function ProtectedRoute({ children, requiredUserType }) {
  const { isAuthenticated, userType, isLoading } = useSelector(state => state.auth)
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to="/" replace />
  }
  
  return children
}

// Public Route Component (redirect if authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated, userType } = useSelector(state => state.auth)
  
  if (isAuthenticated) {
    if (userType === 'barber') {
      return <Navigate to="/barber/dashboard" replace />
    } else {
      return <Navigate to="/customer/dashboard" replace />
    }
  }
  
  return children
}

function App() {
  const dispatch = useDispatch()
  const { currentLanguage } = useSelector(state => state.language)
  
  useEffect(() => {
    // Initialize auth on app start
    dispatch(initializeAuth())
  }, [dispatch])
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
      <Router>
        <Navbar />
        
        <main className="pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              } 
            />
            
            {/* Customer Routes */}
            <Route 
              path="/customer/dashboard" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/shop/:id" 
              element={
                <ProtectedRoute requiredUserType="customer">
                  <ShopDetails />
                </ProtectedRoute>
              } 
            />
            
            {/* Barber Routes */}
            <Route 
              path="/barber/dashboard" 
              element={
                <ProtectedRoute requiredUserType="barber">
                  <BarberDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/barber/create-shop" 
              element={
                <ProtectedRoute requiredUserType="barber">
                  <CreateShop />
                </ProtectedRoute>
              } 
            />
            
            {/* Common Protected Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            className: `${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`,
            style: {
              background: '#ffffff',
              color: '#8c4030',
              border: '1px solid #f1c338',
            },
          }}
        />
      </Router>
    </div>
  )
}

export default App