import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, X, User, LogOut, Globe, Scissors } from 'lucide-react'
import { logout } from '../../store/slices/authSlice'
import { toggleLanguage, getTranslation } from '../../store/slices/languageSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { isAuthenticated, user, userType } = useSelector(state => state.auth)
  const { currentLanguage } = useSelector(state => state.language)
  
  // Translation helper
  
const languageState = useSelector(state => state.language)

// Translation helper
const t = (key) => getTranslation(languageState, key)
  const handleLogout = () => {
    dispatch(logout())
    setIsOpen(false)
    navigate('/')
  }
  
  const handleLanguageToggle = () => {
    dispatch(toggleLanguage())
  }
  
  const closeMenu = () => {
    setIsOpen(false)
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-barber border-b border-accent-200">
      <div className="max-w-7xl mx-auto mobile-padding">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">
              {t('appName')}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-secondary-600 hover:bg-accent-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentLanguage === 'en' ? 'ગુજરાતી' : 'English'}
              </span>
            </button>
            
            {!isAuthenticated ? (
              // Guest Navigation
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-secondary-600 hover:text-secondary-700 font-medium transition-colors"
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  {t('register')}
                </Link>
              </div>
            ) : (
              // Authenticated Navigation
              <div className="flex items-center space-x-4">
                
                {/* Dashboard Link */}
                <Link
                  to={userType === 'barber' ? '/barber/dashboard' : '/customer/dashboard'}
                  className="text-secondary-600 hover:text-secondary-700 font-medium transition-colors"
                >
                  {userType === 'barber' ? t('myShop') : t('myTokens')}
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-secondary-600 hover:bg-accent-100 transition-colors">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-accent-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:bg-accent-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>{t('profile')}</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-secondary-600 hover:bg-accent-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-accent-200 bg-white">
            <div className="py-4 space-y-4">
              
              {/* Language Toggle */}
              <button
                onClick={() => {
                  handleLanguageToggle()
                  closeMenu()
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left text-secondary-600 hover:bg-accent-50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage === 'en' ? 'ગુજરાતી' : 'English'}</span>
              </button>
              
              {!isAuthenticated ? (
                // Guest Mobile Navigation
                <div className="space-y-2 px-4">
                  <Link 
                    to="/login" 
                    className="block py-2 text-secondary-600 hover:text-secondary-700 font-medium transition-colors"
                    onClick={closeMenu}
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/register" 
                    className="block btn-primary text-center"
                    onClick={closeMenu}
                  >
                    {t('register')}
                  </Link>
                </div>
              ) : (
                // Authenticated Mobile Navigation
                <div className="space-y-2">
                  <div className="px-4 py-2 border-b border-accent-100">
                    <p className="font-medium text-secondary-700">{user?.name}</p>
                    <p className="text-sm text-secondary-500">
                      {userType === 'barber' ? 'વાળંદ' : 'ગ્રાહક'}
                    </p>
                  </div>
                  
                  <Link
                    to={userType === 'barber' ? '/barber/dashboard' : '/customer/dashboard'}
                    className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:bg-accent-50 transition-colors"
                    onClick={closeMenu}
                  >
                    <User className="w-4 h-4" />
                    <span>{userType === 'barber' ? t('myShop') : t('myTokens')}</span>
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:bg-accent-50 transition-colors"
                    onClick={closeMenu}
                  >
                    <User className="w-4 h-4" />
                    <span>{t('profile')}</span>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar