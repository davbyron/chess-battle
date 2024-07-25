import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { numBoardSquares } from 'src/constants'
import { BoardSquare, Card } from '../types/types'

export interface GameState {
  gameId: string | null
  activeCard: Card | null
  activeSquare: number | null
  availableBoardSquares: number[] | null
  cardIndex: number
  playerHand: Card[],
  opponentHand: Card[],
  board: BoardSquare[],
}

const initialState: GameState = {
  gameId: null,
  activeCard: null,
  activeSquare: null,
  availableBoardSquares: null,
  cardIndex: 0,
  playerHand: [],
  opponentHand: [],
  board: Array.from({ length: numBoardSquares }, (_, index) => ({
    id: index
  })),
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<string>) => {
      state.gameId = action.payload;
    },
    activateBoardSquare: (state, action: PayloadAction<number>) => {
      state.activeSquare = action.payload;
    },
    deactivateBoardSquare: (state) => {
      state.activeSquare = null;
    },
    setAvailableBoardSquares: (state, action: PayloadAction<number[]>) => {
      state.availableBoardSquares = action.payload;
    },
    activateCard: (state, action: PayloadAction<Card>) => {
      state.activeCard = action.payload;
    },
    deactivateCard: (state) => {
      state.activeCard = null;
    },
    addCardToPlayerHand: (state, action:PayloadAction<Card>) => {
      state.playerHand = state.playerHand.concat(action.payload);
    },
    removeCardFromPlayerHand: (state, action:PayloadAction<Card>) => {
      const newHand = state.playerHand.filter(card => card.id !== action.payload.id);
      state.playerHand = newHand;
    },
    addCardToOpponentHand: (state, action:PayloadAction<Card>) => {
      state.opponentHand = state.opponentHand.concat(action.payload);
    },
    removeCardFromOpponentHand: (state, action:PayloadAction<Card>) => {
      const newHand = state.opponentHand.filter(card => card.id !== action.payload.id);
      state.opponentHand = newHand;
    },
    updateBoardSquare: (state, action: PayloadAction<BoardSquare>) => {
      const newBoard = state.board.toSpliced(action.payload.id, 1, action.payload);
      state.board = newBoard;
    },
  }
});

export const {
  setGameId,
  activateCard,
  deactivateCard,
  activateBoardSquare,
  deactivateBoardSquare,
  setAvailableBoardSquares,
  addCardToPlayerHand,
  removeCardFromPlayerHand,
  addCardToOpponentHand,
  removeCardFromOpponentHand,
  updateBoardSquare
} = gameSlice.actions;

export const selectGameId = (state: RootState) => state.game.gameId;
export const selectActiveCard = (state: RootState) => state.game.activeCard;
export const selectActiveBoardSquare = (state: RootState) => state.game.activeSquare;
export const selectAvailableBoardSquares = (state: RootState) => state.game.availableBoardSquares;
export const selectPlayerHand = (state: RootState) => state.game.playerHand;
export const selectOpponentHand = (state: RootState) => state.game.opponentHand;
export const selectBoard = (state: RootState) => state.game.board;

export default gameSlice.reducer;
