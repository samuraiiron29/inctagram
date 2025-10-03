import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  accessToken: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    logout: state => {
      state.accessToken = null
      state.isLoggedIn = false
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectAccessToken: (state) => state.accessToken,
  }
})

export const { setAccessToken, setIsLoggedIn, logout } = authSlice.actions
export const {selectIsLoggedIn, selectAccessToken} = authSlice.selectors
export default authSlice.reducer
