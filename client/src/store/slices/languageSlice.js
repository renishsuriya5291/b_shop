import { createSlice } from '@reduxjs/toolkit'

// Translation objects
const translations = {
  en: {
    // Navigation & Common
    home: 'Home',
    shops: 'Shops',
    queue: 'Queue',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    loading: 'Loading...',
    
    // BarberQ Branding
    appName: 'BarberQ',
    tagline: 'Skip the Wait, Get Your Cut!',
    
    // Authentication
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    phone: 'Phone Number',
    loginTitle: 'Welcome Back',
    registerTitle: 'Join BarberQ',
    customerLogin: 'Customer Login',
    barberLogin: 'Barber Login',
    continueWithGoogle: 'Continue with Google',
    
    // Customer Dashboard
    findShops: 'Find Barber Shops',
    myTokens: 'My Tokens',
    nearbyShops: 'Nearby Shops',
    generateToken: 'Get Token',
    tokenNumber: 'Token #',
    queuePosition: 'Position in Queue',
    estimatedWait: 'Estimated Wait',
    currentlyServing: 'Currently Serving',
    
    // Barber Dashboard
    myShop: 'My Shop',
    createShop: 'Create Shop',
    shopName: 'Shop Name',
    address: 'Address',
    callNext: 'Call Next Customer',
    currentCustomer: 'Current Customer',
    waitingCustomers: 'Waiting Customers',
    noCustomers: 'No customers in queue',
    
    // Shop Status
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
    available: 'Available',
    
    // Preferences
    hairCut: 'Hair Cut Style',
    beardStyle: 'Beard Style',
    notes: 'Notes',
    uploadPhoto: 'Upload Photo',
    savePreferences: 'Save Preferences',
    customerPreferences: 'Customer Preferences',
    
    // Queue Status
    waiting: 'Waiting',
    current: 'Current',
    completed: 'Completed',
    
    // Time & Date
    today: 'Today',
    yesterday: 'Yesterday',
    minutes: 'minutes',
    hours: 'hours',
    
    // Messages
    noShopsFound: 'No shops found',
    tokenGenerated: 'Token generated successfully!',
    updateProfile: 'Update Profile',
    changeLanguage: 'Change Language',
  },
  gu: {
    // Navigation & Common - Gujarati
    home: 'ઘર',
    shops: 'દુકાનો',
    queue: 'કતાર',
    profile: 'પ્રોફાઇલ',
    login: 'લૉગિન',
    register: 'નોંધણી',
    logout: 'લૉગ આઉટ',
    cancel: 'રદ કરો',
    save: 'સેવ કરો',
    edit: 'સંપાદિત કરો',
    delete: 'કાઢી નાખો',
    back: 'પાછા',
    next: 'આગળ',
    loading: 'લોડ થઈ રહ્યું છે...',
    
    // BarberQ Branding
    appName: 'બાર્બરક્યુ',
    tagline: 'રાહ છોડો, તમારું કટ કરાવો!',
    
    // Authentication
    email: 'ઈમેલ',
    password: 'પાસવર્ડ',
    name: 'પૂરું નામ',
    phone: 'ફોન નંબર',
    loginTitle: 'સ્વાગત છે',
    registerTitle: 'બાર્બરક્યુમાં જોડાઓ',
    customerLogin: 'ગ્રાહક લૉગિન',
    barberLogin: 'વાળંદ લૉગિન',
    continueWithGoogle: 'ગૂગલ સાથે ચાલુ રાખો',
    
    // Customer Dashboard
    findShops: 'વાળંદની દુકાન શોધો',
    myTokens: 'મારા ટોકન',
    nearbyShops: 'નજીકની દુકાનો',
    generateToken: 'ટોકન લો',
    tokenNumber: 'ટોકન નં.',
    queuePosition: 'કતારમાં સ્થાન',
    estimatedWait: 'અંદાજિત રાહ',
    currentlyServing: 'હાલમાં સેવા આપી રહ્યા છે',
    
    // Barber Dashboard
    myShop: 'મારી દુકાન',
    createShop: 'દુકાન બનાવો',
    shopName: 'દુકાનનું નામ',
    address: 'સરનામું',
    callNext: 'આગલા ગ્રાહકને બોલાવો',
    currentCustomer: 'વર્તમાન ગ્રાહક',
    waitingCustomers: 'રાહ જોઈ રહેલા ગ્રાહકો',
    noCustomers: 'કતારમાં કોઈ ગ્રાહક નથી',
    
    // Shop Status
    open: 'ખુલ્લું',
    closed: 'બંધ',
    busy: 'વ્યસ્ત',
    available: 'ઉપલબ્ધ',
    
    // Preferences
    hairCut: 'વાળ કાપવાની સ્ટાઇલ',
    beardStyle: 'દાઢીની સ્ટાઇલ',
    notes: 'નોંધ',
    uploadPhoto: 'ફોટો અપલોડ કરો',
    savePreferences: 'પસંદગી સેવ કરો',
    customerPreferences: 'ગ્રાહકની પસંદગી',
    
    // Queue Status
    waiting: 'રાહ જોઈ રહ્યા છે',
    current: 'વર્તમાન',
    completed: 'પૂર્ણ',
    
    // Time & Date
    today: 'આજે',
    yesterday: 'ગઈકાલે',
    minutes: 'મિનિટ',
    hours: 'કલાક',
    
    // Messages
    noShopsFound: 'કોઈ દુકાન મળી નથી',
    tokenGenerated: 'ટોકન સફળતાપૂર્વક બનાવાયો!',
    updateProfile: 'પ્રોફાઇલ અપડેટ કરો',
    changeLanguage: 'ભાષા બદલો',
  }
}

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: localStorage.getItem('language') || 'gu', // Default to Gujarati
    translations: translations,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload
      localStorage.setItem('language', action.payload)
    },
    toggleLanguage: (state) => {
      const newLanguage = state.currentLanguage === 'en' ? 'gu' : 'en'
      state.currentLanguage = newLanguage
      localStorage.setItem('language', newLanguage)
    }
  },
})

export const { setLanguage, toggleLanguage } = languageSlice.actions

// Selector to get translated text
// Selector to get translated text
export const getTranslation = (state, key) => {
  // Handle both full Redux state and language slice state
  const languageState = state.language || state
  return languageState.translations[languageState.currentLanguage][key] || key
}
export default languageSlice.reducer