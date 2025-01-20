import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Prd, PrdSel, PrdSelMut } from '@src/tool/entries'

// Создаем slice редьюсер+экшен
const prdSelSlice = createSlice({
	name: 'selections',
	initialState: Array<PrdSel>(),
	reducers: {
		add(selections: PrdSel[], action: PayloadAction<[Prd, number]>) {
			PrdSelMut.addPrd(selections, action.payload[0], action.payload[1])
		},
	},
})

// Редьюсер
export const reducer = prdSelSlice.reducer
// Экшен
export const { add } = prdSelSlice.actions
