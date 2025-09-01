import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

// Create axios instance with base config
const api = axios.create({
  baseURL: API_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Customer Registration
export const registerCustomer = createAsyncThunk(
  'auth/registerCustomer',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/customer/register', userData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userType', 'customer')
      toast.success('Registration successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

// Customer Login
export const loginCustomer = createAsyncThunk(
  'auth/loginCustomer',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/customer/login', userData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userType', 'customer')
      toast.success('Login successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

// Barber Registration
export const registerBarber = createAsyncThunk(
  'auth/registerBarber',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/barber/register', userData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userType', 'barber')
      toast.success('Barber registration successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

// Barber Login
export const loginBarber = createAsyncThunk(
  'auth/loginBarber',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/barber/login', userData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userType', 'barber')
      toast.success('Barber login successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

// Google Login
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/customer/google-login', userData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userType', 'customer')
      toast.success('Google login successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Google login failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    try {
      const userType = localStorage.getItem('userType')
      if (userType === 'barber') {
        await api.post('/barber/logout')
      } else {
        await api.post('/customer/logout')
      }
      
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
      toast.success('Logged out successfully!')
    } catch (error) {
      // Clear local storage even if API call fails
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
      toast.success('Logged out successfully!')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    userType: localStorage.getItem('userType'),
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('token')
      const userType = localStorage.getItem('userType')
      
      if (token && userType) {
        state.token = token
        state.userType = userType
        state.isAuthenticated = true
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Customer Register
      .addCase(registerCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.userType = 'customer'
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Customer Login
      .addCase(loginCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.userType = 'customer'
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Barber Register
      .addCase(registerBarber.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerBarber.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.barber
        state.token = action.payload.token
        state.userType = 'barber'
      })
      .addCase(registerBarber.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Barber Login
      .addCase(loginBarber.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginBarber.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.barber
        state.token = action.payload.token
        state.userType = 'barber'
      })
      .addCase(loginBarber.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.userType = 'customer'
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.userType = null
        state.isLoading = false
      })
  },
})

export const { clearError, initializeAuth } = authSlice.actions
export default authSlice.reducer