import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Search, MapPin, Clock, Users, Scissors, Star, ArrowRight, RefreshCw } from 'lucide-react'
import { getAllShops } from '../../store/slices/shopSlice'
import { getTranslation } from '../../store/slices/languageSlice'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const CustomerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  
  const { shops, isLoading } = useSelector(state => state.shop)
  const { myTokens, isLoading: tokensLoading } = useSelector(state => state.token)
  const { user } = useSelector(state => state.auth)
  const { currentLanguage } = useSelector(state => state.language)
  
  
const languageState = useSelector(state => state.language)

// Translation helper
const t = (key) => getTranslation(languageState, key)
  useEffect(() => {
    dispatch(getAllShops())
  }, [dispatch])
  
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.address.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const activeTokens = myTokens.filter(token => token.status !== 'completed')
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'waiting':
        return 'status-badge bg-yellow-100 text-yellow-800'
      case 'current':
        return 'status-badge bg-green-100 text-green-800'
      default:
        return 'status-badge bg-accent-100 text-accent-800'
    }
  }
  
  const getStatusText = (status) => {
    switch (status) {
      case 'waiting':
        return currentLanguage === 'gu' ? 'રાહ જોઈ રહ્યા છે' : 'Waiting'
      case 'current':
        return currentLanguage === 'gu' ? 'વર્તમાન' : 'Your Turn!'
      default:
        return status
    }
  }
  
  const handleRefresh = () => {
    dispatch(getAllShops())
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 page-fade-in">
      <div className="max-w-7xl mx-auto mobile-padding py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                {currentLanguage === 'gu' ? 'સ્વાગત છે' : 'Welcome'}, {user?.name}!
              </h1>
              <p className={`text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                {currentLanguage === 'gu' 
                  ? 'તમારા પસંદીદા વાળંદની દુકાન શોધો અને ટોકન લો'
                  : 'Find your favorite barber shop and get a token'
                }
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="btn-outline p-3"
              title={currentLanguage === 'gu' ? 'રીફ્રેશ કરો' : 'Refresh'}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Active Tokens Section */}
        {activeTokens.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-xl font-bold text-secondary-700 mb-4 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {t('myTokens')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tokensLoading ? (
                <LoadingSpinner text={currentLanguage === 'gu' ? 'ટોકન લોડ થઈ રહ્યા છે...' : 'Loading tokens...'} />
              ) : (
                activeTokens.map(token => (
                  <div key={token.id} className="card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`font-bold text-secondary-700 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                          {token.shop?.name}
                        </h3>
                        <p className={`text-sm text-secondary-500 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                          {token.shop?.address}
                        </p>
                      </div>
                      <span className={getStatusBadge(token.status)}>
                        {getStatusText(token.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gradient">#{token.token_number}</div>
                          <div className={`text-xs text-secondary-500 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                            {t('tokenNumber')}
                          </div>
                        </div>
                        
                        {token.queue_position && token.queue_position > 0 && (
                          <div className="text-center">
                            <div className="text-lg font-semibold text-secondary-600">{token.queue_position}</div>
                            <div className={`text-xs text-secondary-500 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                              {currentLanguage === 'gu' ? 'આગળ' : 'ahead'}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Link
                        to={`/shop/${token.shop?.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors flex items-center space-x-1"
                      >
                        <span className={currentLanguage === 'gu' ? 'font-gujarati text-sm' : 'font-english text-sm'}>
                          {currentLanguage === 'gu' ? 'વિગત' : 'Details'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        {/* Search Section */}
        <div className="mb-8">
          <div className="card">
            <h2 className={`text-xl font-bold text-secondary-700 mb-4 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {t('findShops')}
            </h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11"
                placeholder={currentLanguage === 'gu' ? 'દુકાનનું નામ અથવા સ્થાન શોધો...' : 'Search by shop name or location...'}
              />
            </div>
          </div>
        </div>
        
        {/* Shops Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold text-secondary-700 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {t('nearbyShops')} ({filteredShops.length})
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card animate-pulse">
                  <div className="w-full h-32 bg-accent-200 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-accent-200 rounded w-3/4"></div>
                    <div className="h-3 bg-accent-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredShops.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className={`text-lg font-semibold text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                {t('noShopsFound')}
              </h3>
              <p className={`text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                {currentLanguage === 'gu' 
                  ? 'અલગ કીવર્ડ વડે શોધીને જુઓ'
                  : 'Try searching with different keywords'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map(shop => (
                <Link 
                  key={shop.id}
                  to={`/shop/${shop.id}`}
                  className="card-hover group"
                >
                  {/* Shop Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
                        <Scissors className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-secondary-700 group-hover:text-primary-600 transition-colors ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                          {shop.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-secondary-500">
                          <Star className="w-3 h-3 fill-current text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </div>
                    
                    <span className={shop.barber?.is_busy ? 'status-busy' : 'status-open'}>
                      {shop.barber?.is_busy 
                        ? (currentLanguage === 'gu' ? 'વ્યસ્ત' : 'Busy')
                        : (currentLanguage === 'gu' ? 'ખુલ્લું' : 'Open')
                      }
                    </span>
                  </div>
                  
                  {/* Shop Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-secondary-600">
                      <MapPin className="w-4 h-4 text-secondary-400" />
                      <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                        {shop.address}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-secondary-600">
                          <Users className="w-4 h-4 text-secondary-400" />
                          <span>{shop.current_token || 0}</span>
                          <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                            {currentLanguage === 'gu' ? 'કતાર' : 'in queue'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-secondary-600">
                          <Clock className="w-4 h-4 text-secondary-400" />
                          <span>~15 min</span>
                        </div>
                      </div>
                      
                      <ArrowRight className="w-4 h-4 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Scissors className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gradient">{shops.length}</div>
            <div className={`text-sm text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {currentLanguage === 'gu' ? 'કુલ દુકાનો' : 'Total Shops'}
            </div>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gradient">{shops.filter(s => !s.barber?.is_busy).length}</div>
            <div className={`text-sm text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {currentLanguage === 'gu' ? 'ઉપલબ્ધ' : 'Available'}
            </div>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="text-2xl font-bold text-gradient">{activeTokens.length}</div>
            <div className={`text-sm text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {currentLanguage === 'gu' ? 'મારા ટોકન' : 'My Tokens'}
            </div>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gradient">2.5</div>
            <div className={`text-sm text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {currentLanguage === 'gu' ? 'કલાક બચત' : 'Hours Saved'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard