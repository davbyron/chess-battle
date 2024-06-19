import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { CardProps } from '../types/types'

export interface GameState {
    activeCard: CardProps | null
    activeSquare: number | null
    availableBoardSquares: number[] | null
    cardIndex: number
    playerHand: CardProps[],
    opponentHand: CardProps[],
}

const initialState: GameState = {
    activeCard: null,
    activeSquare: null,
    availableBoardSquares: null,
    cardIndex: 0,
    playerHand: [],
    opponentHand: [],
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        activateBoardSquare: (state, action: PayloadAction<number>) => {
            state.activeSquare = action.payload
        },
        deactivateBoardSquare: (state) => {
            state.activeSquare = null
        },
        setAvailableBoardSquares: (state, action: PayloadAction<number[]>) => {
            state.availableBoardSquares = action.payload
        },
        activateCard: (state, action: PayloadAction<CardProps>) => {
            state.activeCard = action.payload
        },
        deactivateCard: (state) => {
            state.activeCard = null
        },
        addCardToPlayerHand: (state, action:PayloadAction<CardProps>) => {
          state.playerHand = state.playerHand.concat(action.payload)
        },
        removeCardFromPlayerHand: (state, action:PayloadAction<CardProps>) => {
            const newHand = state.playerHand.filter(card => card.id !== action.payload.id)
            state.playerHand = newHand
        },
        addCardToOpponentHand: (state, action:PayloadAction<CardProps>) => {
            state.opponentHand = state.opponentHand.concat(action.payload)
        },
        removeCardFromOpponentHand: (state, action:PayloadAction<CardProps>) => {
            const newHand = state.opponentHand.filter(card => card.id !== action.payload.id)
            state.opponentHand = newHand
        }
    }
});

export const {
    activateCard,
    deactivateCard,
    activateBoardSquare,
    deactivateBoardSquare,
    setAvailableBoardSquares,
    addCardToPlayerHand,
    removeCardFromPlayerHand,
    addCardToOpponentHand,
    removeCardFromOpponentHand
} = gameSlice.actions;

export const selectActiveCard = (state: RootState) => state.game.activeCard;
export const selectActiveBoardSquare = (state: RootState) => state.game.activeSquare;
export const selectAvailableBoardSquares = (state: RootState) => state.game.availableBoardSquares;
export const selectPlayerHand = (state: RootState) => state.game.playerHand;
export const selectOpponentHand = (state: RootState) => state.game.opponentHand;

export default gameSlice.reducer;
