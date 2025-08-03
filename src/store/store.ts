import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/store/services/baseApi'
import appSlice from '@/store/slices/appSlice'
import { baseDeepSeekApi } from '../shared/api/baseDeepApi'
export const store = configureStore({
  reducer: {
    app: appSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [baseDeepSeekApi.reducerPath]: baseDeepSeekApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware, baseDeepSeekApi.middleware),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


