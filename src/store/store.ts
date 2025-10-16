import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/store/services/baseApi'
import appSlice from '@/store/slices/appSlice'
import authSlice from '@/store/slices/authSlice'


export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


