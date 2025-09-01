import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    ArrowLeft,
    Scissors,
    MapPin,
    Phone,
    Clock,
    Users,
    Star,
    Plus,
    RefreshCw,
    User,
    Camera
} from 'lucide-react'
import { getQueueStatus } from '../../store/slices/shopSlice'
import { getTranslation } from '../../store/slices/languageSlice'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const ShopDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [refreshing, setRefreshing] = useState(false)
    const [showPreferences, setShowPreferences] = useState(false)
    const [preferences, setPreferences] = useState({
        hairCutStyle: '',
        beardStyle: '',
        notes: '',
        photo: null
    })

    const { queueData, isLoading } = useSelector(state => state.shop)
    const { myTokens, isLoading: tokenLoading } = useSelector(state => state.token)
    const { user } = useSelector(state => state.auth)
    const { currentLanguage } = useSelector(state => state.language)

    
const currentLanguageState = useSelector(state => state.language)

// Translation helper
const t = (key) => getTranslation(currentLanguageState, key)

    useEffect(() => {
        if (id) {
            dispatch(getQueueStatus(id))
        }
    }, [dispatch, id])

    // Auto-refresh queue status every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (id) {
                dispatch(getQueueStatus(id))
            }
        }, 30000)

        return () => clearInterval(interval)
    }, [dispatch, id])

    const handleRefresh = async () => {
        setRefreshing(true)
        await dispatch(getQueueStatus(id))
        setTimeout(() => setRefreshing(false), 500)
    }

    const handleGenerateToken = async () => {
        dispatch(getQueueStatus(id)) // Refresh queue after generating token
    }

    const handlePreferencesSubmit = (e) => {
        e.preventDefault()
        // Save preferences logic would go here
        console.log('Preferences:', preferences)
        setShowPreferences(false)
    }

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPreferences({
                ...preferences,
                photo: e.target.files[0]
            })
        }
    }

    if (isLoading && !queueData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 flex items-center justify-center">
                <LoadingSpinner size="lg" text={currentLanguage === 'gu' ? 'લોડ થઈ રહ્યું છે...' : 'Loading...'} />
            </div>
        )
    }

    if (!queueData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className={`text-xl font-bold text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                        {currentLanguage === 'gu' ? 'દુકાન મળી નથી' : 'Shop not found'}
                    </h2>
                    <button onClick={() => navigate(-1)} className="btn-primary">
                        {currentLanguage === 'gu' ? 'પાછા જાઓ' : 'Go Back'}
                    </button>
                </div>
            </div>
        )
    }

    const { shop, current_token, waiting_tokens, queue_count } = queueData

    // Check if user already has a token for this shop
    const existingToken = myTokens.find(token =>
        token.shop_id === parseInt(id) && token.status !== 'completed'
    )

    const estimatedWaitTime = queue_count * 15 // 15 minutes per customer

    return (
        <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 page-fade-in">
            <div className="max-w-4xl mx-auto mobile-padding py-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                            {currentLanguage === 'gu' ? 'પાછા' : 'Back'}
                        </span>
                    </button>

                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className={`btn-outline p-3 ${refreshing ? 'animate-spin' : ''}`}
                        title={currentLanguage === 'gu' ? 'રીફ્રેશ કરો' : 'Refresh'}
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                {/* Shop Info Card */}
                <div className="card mb-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center">
                                <Scissors className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className={`text-2xl font-bold text-secondary-700 mb-1 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                    {shop.name}
                                </h1>
                                <div className="flex items-center space-x-1 mb-2">
                                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                                    <span className="text-sm text-secondary-600">4.8 (120 reviews)</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-secondary-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                                        {shop.address}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-secondary-600 mt-1">
                                    <Phone className="w-4 h-4" />
                                    <span>{shop.phone}</span>
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

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-accent-50 rounded-lg">
                            <div className="text-2xl font-bold text-gradient">{queue_count}</div>
                            <div className={`text-sm text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                {currentLanguage === 'gu' ? 'કતારમાં' : 'In Queue'}
                            </div>
                        </div>
                        <div className="text-center p-4 bg-accent-50 rounded-lg">
                            <div className="text-2xl font-bold text-gradient">~{Math.ceil(estimatedWaitTime / 60)}h</div>
                            <div className={`text-sm text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                {currentLanguage === 'gu' ? 'અંદાજિત સમય' : 'Est. Wait'}
                            </div>
                        </div>
                        <div className="text-center p-4 bg-accent-50 rounded-lg">
                            <div className="text-2xl font-bold text-gradient">#{current_token?.token_number || 0}</div>
                            <div className={`text-sm text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                {currentLanguage === 'gu' ? 'હાલનો' : 'Current'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Customer */}
                {current_token && (
                    <div className="card mb-6">
                        <h3 className={`text-lg font-bold text-secondary-700 mb-4 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                            {t('currentlyServing')}
                        </h3>
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">#{current_token.token_number}</span>
                                </div>
                                <div>
                                    <div className={`font-semibold text-green-800 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                        {current_token.user?.name}
                                    </div>
                                    <div className={`text-sm text-green-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                        {currentLanguage === 'gu' ? 'હાલમાં સેવા આપી રહ્યા છે' : 'Currently being served'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Queue List */}
                <div className="card mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-bold text-secondary-700 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                            {t('waitingCustomers')} ({waiting_tokens.length})
                        </h3>
                    </div>

                    {waiting_tokens.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-accent-400" />
                            </div>
                            <p className={`text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                {t('noCustomers')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {waiting_tokens.map((token, index) => (
                                <div
                                    key={token.id}
                                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${existingToken?.id === token.id
                                            ? 'bg-primary-50 border-primary-200'
                                            : 'bg-accent-50 border-accent-200'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${existingToken?.id === token.id
                                                ? 'bg-primary-400 text-white'
                                                : 'bg-secondary-400 text-white'
                                            }`}>
                                            #{token.token_number}
                                        </div>
                                        <div>
                                            <div className={`font-medium text-secondary-700 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                                {existingToken?.id === token.id ? t('you') : token.user?.name}
                                            </div>
                                            <div className={`text-sm text-secondary-500 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                                ~{(index + 1) * 15} {currentLanguage === 'gu' ? 'મિનિટ' : 'minutes'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className={`text-sm font-medium text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                            {currentLanguage === 'gu' ? 'સ્થાન' : 'Position'} {index + 1}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="card">
                    {existingToken ? (
                        <div className="text-center">
                            <div className="mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-green-600">#{existingToken.token_number}</span>
                                </div>
                                <h3 className={`text-lg font-bold text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                    {currentLanguage === 'gu' ? 'તમારો ટોકન એક્ટિવ છે' : 'Your Token is Active'}
                                </h3>
                                <p className={`text-secondary-600 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                    {currentLanguage === 'gu'
                                        ? 'તમારો નંબર આવે ત્યારે અમે તમને જણાવીશું'
                                        : "We'll notify you when it's your turn"
                                    }
                                </p>
                            </div>

                            <button
                                onClick={() => setShowPreferences(true)}
                                className="btn-outline w-full mb-3"
                            >
                                <Camera className="w-4 h-4 mr-2" />
                                <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                                    {currentLanguage === 'gu' ? 'મારી પસંદગી સેવ કરો' : 'Save My Preferences'}
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h3 className={`text-lg font-bold text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                {currentLanguage === 'gu' ? 'ટોકન લેવા તૈયાર છો?' : 'Ready to Get a Token?'}
                            </h3>
                            <p className={`text-secondary-600 mb-6 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                {currentLanguage === 'gu'
                                    ? 'ટોકન લો અને કતારમાં તમારું સ્થાન બુક કરો'
                                    : 'Get a token and reserve your place in queue'
                                }
                            </p>

                            <button
                                onClick={handleGenerateToken}
                                disabled={tokenLoading || shop.barber?.is_busy}
                                className={`btn-primary w-full py-4 text-lg ${tokenLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {tokenLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <LoadingSpinner size="sm" />
                                        <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                                            {currentLanguage === 'gu' ? 'ટોકન જનરેટ થઈ રહ્યું છે...' : 'Generating Token...'}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Plus className="w-5 h-5" />
                                        <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                                            {t('generateToken')}
                                        </span>
                                    </div>
                                )}
                            </button>

                            {shop.barber?.is_busy && (
                                <p className={`text-yellow-600 text-sm mt-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                    {currentLanguage === 'gu'
                                        ? 'વાળંદ હાલમાં વ્યસ્ત છે. કૃપા કરીને થોડી રાહ જુઓ.'
                                        : 'Barber is currently busy. Please wait a moment.'
                                    }
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Preferences Modal */}
                {showPreferences && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-md w-full p-6">
                            <h3 className={`text-lg font-bold text-secondary-700 mb-4 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                {t('savePreferences')}
                            </h3>

                            <form onSubmit={handlePreferencesSubmit} className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                        {t('hairCut')}
                                    </label>
                                    <input
                                        type="text"
                                        value={preferences.hairCutStyle}
                                        onChange={(e) => setPreferences({ ...preferences, hairCutStyle: e.target.value })}
                                        className="input-field"
                                        placeholder={currentLanguage === 'gu' ? 'જેમ કે: શોર્ટ કટ, લેયર કટ' : 'e.g: Short cut, Layer cut'}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                        {t('beardStyle')}
                                    </label>
                                    <input
                                        type="text"
                                        value={preferences.beardStyle}
                                        onChange={(e) => setPreferences({ ...preferences, beardStyle: e.target.value })}
                                        className="input-field"
                                        placeholder={currentLanguage === 'gu' ? 'જેમ કે: ફુલ બિયર્ડ, ટ્રિમ' : 'e.g: Full beard, Trim'}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                        {t('notes')}
                                    </label>
                                    <textarea
                                        value={preferences.notes}
                                        onChange={(e) => setPreferences({ ...preferences, notes: e.target.value })}
                                        className="input-field h-20 resize-none"
                                        placeholder={currentLanguage === 'gu' ? 'વિશેષ સૂચનાઓ...' : 'Special instructions...'}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-secondary-700 mb-2 ${currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}`}>
                                        {t('uploadPhoto')}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="input-field"
                                    />
                                </div>

                                <div className="flex space-x-3">
                                    <button type="submit" className="btn-primary flex-1">
                                        <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                                            {t('save')}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowPreferences(false)}
                                        className="btn-outline flex-1"
                                    >
                                        <span className={currentLanguage === 'gu' ? 'font-gujarati' : 'font-english'}>
                                            {t('cancel')}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShopDetails