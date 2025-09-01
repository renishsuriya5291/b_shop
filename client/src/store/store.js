import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import shopSlice from './slices/shopSlice'
import tokenSlice from './slices/tokenSlice'
import languageSlice from './slices/languageSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: shopSlice,
    token: tokenSlice,
    language: languageSlice,
  },
})

export default store