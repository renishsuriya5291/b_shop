import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Eye, EyeOff, Mail, Lock, User, Scissors } from 'lucide-react'
import { loginCustomer, loginBarber } from '../../store/slices/authSlice'
import { getTranslation } from '../../store/slices/languageSlice'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [userType, setUserType] = useState('customer') // 'customer' or 'barber'
  const [showPassword, setShowPassword] = useState(false)
  
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.auth)
  const { currentLanguage } = useSelector(state => state.language)
  
const languageState = useSelector(state => state.language)

// Translation helper
const t = (key) => getTranslation(languageState, key)
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (userType === 'barber') {
      dispatch(loginBarber(formData))
    } else {
      dispatch(loginCustomer(formData))
    }
  }
  
  const handleGoogleLogin = () => {
    // Google OAuth integration would go here
    console.log('Google login clicked')
    // For now, we'll simulate Google login
    // dispatch(googleLogin({ google_id: 'demo', name: 'Demo User', email: 'demo@gmail.com' }))
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center mobile-padding page-fade-in">
      <div className="w-full max-w-md">
        
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-barber">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
            {currentLanguage === 'gu' ? 'સ્વાગત છે' : 'Welcome Back'}
          </h1>
          <p className={`text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
            {currentLanguage === 'gu' ? 'બાર્બરક્યુમાં લૉગિન કરો' : 'Sign in to BarberQ'}
          </p>
        </div>
        
        {/* User Type Toggle */}
        <div className="bg-white rounded-xl p-2 mb-6 shadow-sm">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                userType === 'customer'
                  ? 'bg-primary-400 text-white shadow-sm'
                  : 'text-secondary-600 hover:bg-accent-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <User className="w-4 h-4" />
                <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                  {currentLanguage === 'gu' ? 'ગ્રાહક' : 'Customer'}
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setUserType('barber')}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                userType === 'barber'
                  ? 'bg-secondary-400 text-white shadow-sm'
                  : 'text-secondary-600 hover:bg-accent-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Scissors className="w-4 h-4" />
                <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                  {currentLanguage === 'gu' ? 'વાળંદ' : 'Barber'}
                </span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                {t('email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field pl-11"
                  placeholder={currentLanguage === 'gu' ? 'તમારો ઈમેલ દાખલ કરો' : 'Enter your email'}
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pl-11 pr-11"
                  placeholder={currentLanguage === 'gu' ? 'તમારો પાસવર્ડ દાખલ કરો' : 'Enter your password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                userType === 'customer' ? 'btn-primary' : 'btn-secondary'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                    {currentLanguage === 'gu' ? 'લૉગિન થઈ રહ્યું છે...' : 'Signing in...'}
                  </span>
                </div>
              ) : (
                <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                  {userType === 'customer' 
                    ? (currentLanguage === 'gu' ? 'ગ્રાહક લૉગિન' : 'Customer Login')
                    : (currentLanguage === 'gu' ? 'વાળંદ લૉગિન' : 'Barber Login')
                  }
                </span>
              )}
            </button>
            
            {/* Google Login - Only for Customers */}
            {userType === 'customer' && (
              <div>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-accent-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`bg-white px-4 text-secondary-500 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                      {currentLanguage === 'gu' ? 'અથવા' : 'or'}
                    </span>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-accent-300 rounded-lg text-secondary-700 bg-white hover:bg-accent-50 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                    {currentLanguage === 'gu' ? 'ગૂગલ સાથે ચાલુ રાખો' : 'Continue with Google'}
                  </span>
                </button>
              </div>
            )}
          </form>
          
          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className={`text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {currentLanguage === 'gu' ? 'એકાઉન્ટ નથી?' : "Don't have an account?"}{' '}
              <Link 
                to="/register" 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {currentLanguage === 'gu' ? 'નોંધણી કરો' : 'Sign up'}
              </Link>
            </p>
          </div>
        </div>
        
        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className={`text-sm text-secondary-500 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
            {currentLanguage === 'gu' 
              ? 'લૉગિન કરીને તમે અમારી સર્વિસ નિયમો સ્વીકારો છો'
              : 'By signing in, you agree to our Terms of Service'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage