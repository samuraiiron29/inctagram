'use client'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { Nullable } from '@/shared/lib/types/types'
import { baseApi } from '../services/baseApi'

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppState = {
  status: RequestStatus
  error: Nullable
  // email: Nullable
  // isLoggedIn: boolean
  // userId: Nullable<number>
  dev: Nullable<boolean>
  openCreate: boolean
}

const initialState: AppState = {
  status: 'idle',
  error: null,
  // email: null,
  // isLoggedIn: false,
  // userId: null,
  dev: false,
  openCreate: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: build => ({
    setAppStatus: build.reducer<RequestStatus>((state, action) => {
      state.status = action.payload
    }),
    setAppError: build.reducer<string | null>((state, action) => {
      state.error = action.payload
    }),
    // setAppEmail: build.reducer<string | null>((state, action) => {
    //   state.email = action.payload
    // }),
    // setIsLoggedIn: build.reducer<boolean>((state, action) => {
    //   state.isLoggedIn = action.payload
    // }),
    setAppDev: build.reducer<boolean>((state, action) => {
      state.dev = action.payload
    }),
    // setUserId: build.reducer<number>((state, action) => {
    //   state.userId = action.payload
    // }),
    setOpenCreate: build.reducer<boolean>((state, action) => {
      state.openCreate = action.payload
    }),
  }),
  selectors: {
    selectAppStatus: state => state.status,
    selectAppError: state => state.error,
    // selectAppEmail: state => state.email,
    // selectIsLoggedIn: state => state.isLoggedIn,
    selectAppDev: state => state.dev,
    // selectUserId: state => state.userId,
    selectOpenCreate: state => state.openCreate,
  },
  extraReducers: builder => {
    const isFromRtkQuery = (type: string) => type.startsWith(`${baseApi.reducerPath}/`)
    builder
      .addMatcher(
        (a): a is any => isPending(a) && !isFromRtkQuery(a.type),
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        (a): a is any => isFulfilled(a) && !isFromRtkQuery(a.type),
        state => {
          state.status = 'succeeded'
        }
      )
      .addMatcher(
        (a): a is any => isRejected(a) && !isFromRtkQuery(a.type),
        state => {
          state.status = 'failed'
        }
      )
  },
})

export const { setAppStatus, setAppError, setAppDev, setOpenCreate } = appSlice.actions
export const { selectAppStatus, selectAppError, selectAppDev, selectOpenCreate } = appSlice.selectors

export default appSlice.reducer
