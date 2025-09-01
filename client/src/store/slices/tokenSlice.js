import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

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

// Get all shops
export const getAllShops = createAsyncThunk(
  'shop/getAllShops',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/shops')
      return response.data.shops
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch shops'
      return rejectWithValue(message)
    }
  }
)

// Get shop details with queue
export const getShopDetails = createAsyncThunk(
  'shop/getShopDetails',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shops/${shopId}`)
      return response.data.shop
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch shop details'
      return rejectWithValue(message)
    }
  }
)

// Get queue status
export const getQueueStatus = createAsyncThunk(
  'shop/getQueueStatus',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shops/${shopId}/queue`)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch queue status'
      return rejectWithValue(message)
    }
  }
)

// Create shop (for barbers)
export const createShop = createAsyncThunk(
  'shop/createShop',
  async (shopData, { rejectWithValue }) => {
    try {
      const response = await api.post('/shop/create', shopData)
      toast.success('Shop created successfully!')
      return response.data.shop
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create shop'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

// Update shop
export const updateShop = createAsyncThunk(
  'shop/updateShop',
  async (shopData, { rejectWithValue }) => {
    try {
      const response = await api.post('/shop/update', shopData)
      toast.success('Shop updated successfully!')
      return response.data.shop
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update shop'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: [],
    currentShop: null,
    queueData: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentShop: (state) => {
      state.currentShop = null
      state.queueData = null
    },
    updateQueueRealtime: (state, action) => {
      state.queueData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all shops
      .addCase(getAllShops.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllShops.fulfilled, (state, action) => {
        state.isLoading = false
        state.shops = action.payload
        state.error = null
      })
      .addCase(getAllShops.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Get shop details
      .addCase(getShopDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getShopDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentShop = action.payload
        state.error = null
      })
      .addCase(getShopDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Get queue status
      .addCase(getQueueStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getQueueStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.queueData = action.payload
        state.error = null
      })
      .addCase(getQueueStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Create shop
      .addCase(createShop.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentShop = action.payload
        state.error = null
      })
      .addCase(createShop.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Update shop
      .addCase(updateShop.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentShop = action.payload
        state.error = null
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearCurrentShop, updateQueueRealtime } = shopSlice.actions
export default shopSlice.reducer