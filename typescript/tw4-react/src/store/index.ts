import { configureStore } from '@reduxjs/toolkit'
import { reducer as selectionsReducer, add } from './selection'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'



export const dataStore = configureStore({
	reducer: { selections: selectionsReducer },
})

export type AppDispatch = typeof dataStore.dispatch
export type RootState = ReturnType<typeof dataStore.getState>

/**
 * useSelector - прочитать данные из хранилища
 * useDispatch - отправить действия с хранилищем
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const reducers = { add }
