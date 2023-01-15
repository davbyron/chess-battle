import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { CardProps, CardType } from '../types/types'

export interface GameState {
    activeCard: CardProps
    activeSquare: number
    player2Hand: CardType[]
}

const initialState: GameState = {
    activeCard: {
        name: '',
        text: '',
        level: '',
        attack: '',
        health: '',
        attackPattern: '',
        imgUrl: ''
    },
    activeSquare: null,
    player2Hand: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        activateCard: (state, action: PayloadAction<CardProps>) => {
            state.activeCard = action.payload
        },
        activateBoardSquare: (state, action: PayloadAction<number>) => {
            state.activeSquare = action.payload
        }
    }
})

export const { activateCard, activateBoardSquare } = gameSlice.actions

export const selectActiveCard = (state: RootState) => state.game.activeCard
export const selectActiveBoardSquare = (state: RootState) => state.game.activeSquare

export default gameSlice.reducer
