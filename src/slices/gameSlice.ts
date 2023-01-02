import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
    activeCard: string
}

const initialState: GameState = {
    activeCard: ''
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        activateCard: (state, action: PayloadAction<string>) => {
            state.activeCard = action.payload
        }
    }
})

export const { activateCard } = gameSlice.actions

export default gameSlice.reducer