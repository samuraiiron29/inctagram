import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'

export const useAppDispatch: () => AppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
