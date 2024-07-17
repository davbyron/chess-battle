import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameSlice'

export const store = configureStore({
    reducer: {
        game: gameReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// For non-component files:
export const dispatch = store.dispatch;
export const getState = store.getState;

export default store
