import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { CardProps } from '../types/types'

export interface GameState {
    activeCard: CardProps
    activeSquare: number
    cardIndex: number
    player2Hand: CardProps[]
}

const initialState: GameState = {
    activeCard: null,
    activeSquare: null,
    cardIndex: 0,
    player2Hand: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        activateBoardSquare: (state, action: PayloadAction<number>) => {
            state.activeSquare = action.payload
        },
        activateCard: (state, action: PayloadAction<CardProps>) => {
            state.activeCard = action.payload
        },
        deactivateCard: (state) => {
            state.activeCard = null
        },
        addCardToPlayer2Hand: (state, action:PayloadAction<CardProps>) => {
            state.player2Hand = state.player2Hand.concat(action.payload)
        },
        removeCardFromPlayer2Hand: (state, action:PayloadAction<CardProps>) => {
            const newHand = state.player2Hand.filter(card => card.id !== action.payload.id)
            state.player2Hand = newHand
        }
    }
})

export const {
    activateCard,
    deactivateCard,
    activateBoardSquare,
    addCardToPlayer2Hand,
    removeCardFromPlayer2Hand
} = gameSlice.actions

export const selectActiveCard = (state: RootState) => state.game.activeCard
export const selectActiveBoardSquare = (state: RootState) => state.game.activeSquare
export const selectPlayer2Hand = (state: RootState) => state.game.player2Hand

export default gameSlice.reducer
