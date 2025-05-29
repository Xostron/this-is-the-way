import { configureStore } from '@reduxjs/toolkit'
import { selections, add } from './selection'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


// Хранилище
export const dataStore = configureStore({
	reducer: { selections},
})


/**
 * useSelector - прочитать данные из хранилища
 * useDispatch - отправить действия с хранилищем
*/
export type AppDispatch = typeof dataStore.dispatch
export type RootState = ReturnType<typeof dataStore.getState>

export const useStore: TypedUseSelectorHook<RootState> = useSelector
export const useStoreDispatch = () => useDispatch<AppDispatch>()


export const reducers = { add }
