import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Clock, Users, Scissors, CheckCircle, Star, ArrowRight } from 'lucide-react'
import { getTranslation } from '../store/slices/languageSlice'

const HomePage = () => {
  const { isAuthenticated, userType } = useSelector(state => state.auth)

  const languageState = useSelector(state => state.language)
  const currentLang = useSelector(state => state.language.currentLanguage)

  // Translation helper
  const t = (key) => getTranslation(languageState, key)
  const features = [
    {
      icon: Clock,
      title: currentLang === 'gu' ? 'સમયની બચત' : 'Save Time',
      description: currentLang === 'gu' ? 'લાંબી કતારમાં રાહ જોવાની જરૂર નથી. ટોકન લો અને ફ્રી રહો!' : 'No more waiting in long queues. Get a token and stay free!',
    },
    {
      icon: Users,
      title: currentLang === 'gu' ? 'સ્માર્ટ કતાર' : 'Smart Queue',
      description: currentLang === 'gu' ? 'રિયલ ટાઇમમાં તમારી કતારની સ્થિતિ જુઓ અને સમય પર પહોંચો.' : 'See your queue position in real-time and arrive on time.',
    },
    {
      icon: Scissors,
      title: currentLang === 'gu' ? 'તમારી પસંદગી યાદ રાખે' : 'Remembers Your Style',
      description: currentLang === 'gu' ? 'વાળંદ તમારી પસંદગી અને ફોટો સેવ કરે છે. દરેક વખતે પૂછવાની જરૂર નથી!' : 'Barber saves your preferences and photos. No need to explain every time!',
    },
  ]


  return (
    <div className="min-h-screen page-fade-in">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-accent-100 pt-20 pb-16">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                  <span className="text-gradient">
                    {currentLang === 'gu' ? 'રાહ છોડો,' : 'Skip the Wait,'}
                  </span>
                  <br />
                  <span className="text-secondary-700">
                    {currentLang === 'gu' ? 'તમારું કટ કરાવો!' : 'Get Your Cut!'}
                  </span>
                </h1>

                <p className={`text-lg md:text-xl text-secondary-600 leading-relaxed ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                  {currentLang === 'gu'
                    ? 'ગુજરાતના વાળંદ માટે સ્માર્ટ ટોકન સિસ્ટમ. હવે કતારમાં રાહ જોવાની જરૂર નથી!'
                    : 'Smart token system for Gujarat barbers. No more waiting in queues!'
                  }
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4">
                      <span>{t('register')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/login" className="btn-outline inline-flex items-center justify-center space-x-2 text-lg px-8 py-4">
                      <span>{t('login')}</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to={userType === 'barber' ? '/barber/dashboard' : '/customer/dashboard'}
                    className="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
                  >
                    <span>
                      {userType === 'barber'
                        ? (currentLang === 'gu' ? 'મારી દુકાન' : 'My Shop')
                        : (currentLang === 'gu' ? 'મારા ટોકન' : 'My Tokens')
                      }
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">100+</div>
                  <div className="text-sm text-secondary-600">
                    {currentLang === 'gu' ? 'વાળંદની દુકાનો' : 'Barber Shops'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">5000+</div>
                  <div className="text-sm text-secondary-600">
                    {currentLang === 'gu' ? 'ખુશ ગ્રાહકો' : 'Happy Customers'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">2hrs</div>
                  <div className="text-sm text-secondary-600">
                    {currentLang === 'gu' ? 'સરેરાશ બચત' : 'Avg. Time Saved'}
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto lg:max-w-full">

                {/* Phone Mockup */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">
                        {currentLang === 'gu' ? 'મારા ટોકન' : 'My Tokens'}
                      </h3>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Scissors className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-2xl font-bold">#23</div>
                            <div className="text-sm opacity-90">
                              {currentLang === 'gu' ? 'રાજેશ સેલૂન' : 'Rajesh Salon'}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">
                              {currentLang === 'gu' ? '2 લોકો આગળ' : '2 ahead'}
                            </div>
                            <div className="text-xs opacity-75">~15 min</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-400 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-primary-300 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-secondary-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-200 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-secondary-700 mb-4 ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {currentLang === 'gu' ? 'કેમ પસંદ કરો બાર્બરક્યુ?' : 'Why Choose BarberQ?'}
            </h2>
            <p className={`text-xl text-secondary-600 max-w-2xl mx-auto ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
              {currentLang === 'gu'
                ? 'આધુનિક ટેકનોલોજી સાથે પરંપરાગત વાળંદની સેવા. સમય બચાવો, સ્ટ્રેસ ઘટાડો.'
                : 'Traditional barber service with modern technology. Save time, reduce stress.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold text-secondary-700 mb-4 ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                  {feature.title}
                </h3>
                <p className={`text-secondary-600 ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-4xl mx-auto mobile-padding text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
            {currentLang === 'gu' ? 'આજે જ શરૂ કરો!' : 'Get Started Today!'}
          </h2>
          <p className={`text-xl mb-8 opacity-90 ${currentLang === 'gu' ? 'font-gujarati' : 'font-english'}`}>
            {currentLang === 'gu'
              ? 'હજારો લોકો બાર્બરક્યુ વાપરીને સમય બચાવી રહ્યા છે. તમે પણ જોડાઓ!'
              : 'Thousands are already saving time with BarberQ. Join them now!'
            }
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-secondary-600 hover:bg-accent-100 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>{t('register')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary-600 font-medium py-3 px-8 rounded-lg transition-all"
              >
                {t('login')}
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage