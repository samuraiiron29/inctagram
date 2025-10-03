import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  accessToken: string | null
}

const initialState: AuthState = { accessToken: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },
    logout: state => {
      state.accessToken = null
    },
  },
  selectors: {
    selectAccessToken: state => state.accessToken,
  }
})

export const { setAccessToken, logout } = authSlice.actions
export const {selectAccessToken} = authSlice.selectors
export default authSlice.reducer