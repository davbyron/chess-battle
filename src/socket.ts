"use client";

import { io, type Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "src/types/types";
import { getSession } from "next-auth/react";
import { dispatch, getState } from "src/store";
import { addCardToOpponentHand, activateBoardSquare, activateCard, updateBoardSquare, removeCardFromPlayerHand, removeCardFromOpponentHand } from "src/slices/gameSlice";
import { numBoardSquares } from "src/constants";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

/**
 * Adds a card to the opponent's hand
 */
socket.on("drawCard", async (card, playerId) => {
  const session = await getSession();
  if (session?.user.id !== playerId) dispatch(addCardToOpponentHand(card));
})

/**
 * Removes a card from designated player's hand
 */
socket.on("discardCard", async (card, playerId) => {
  const session = await getSession();
  if (session?.user.id === playerId) {
    dispatch(removeCardFromPlayerHand(card));
  } else {
    dispatch(removeCardFromOpponentHand(card));
  }
})

/**
 * Inserts pawn into specific board square
 */
socket.on("movePawn", async (card, startingBoardSquareId, endingBoardSquareId, playerId) => {
  const board = getState().game.board;
  const session = await getSession();

  if (session?.user.id !== playerId) {
    const opppositeEndingSquareId = numBoardSquares - endingBoardSquareId - 1;
    const endingBoardSquareForOpponent = board.at(opppositeEndingSquareId);

    if (endingBoardSquareForOpponent) {
      // Update ending board square
      dispatch(updateBoardSquare({
        ...endingBoardSquareForOpponent,
        card: {
          ...card,
          location: "boardSquare",
        },
      }));
    }

    // Update starting board square data if didn't come from hand
    if (typeof startingBoardSquareId === "number") {
      const oppositeStartingSquareId = numBoardSquares - startingBoardSquareId - 1;
      const startingBoardSquareForOpponent = board.at(oppositeStartingSquareId);

      if (startingBoardSquareForOpponent) {
        dispatch(updateBoardSquare({
          ...startingBoardSquareForOpponent,
          card: undefined,
        }));
      }
    }
  } else {
    const endingBoardSquareForPlayer = board.at(endingBoardSquareId);

    // Update starting board square data if didn't come from hand
    if (typeof startingBoardSquareId === "number") {
      const startingBoardSquareForPlayer = board.at(startingBoardSquareId);
      if (startingBoardSquareForPlayer) {
        dispatch(updateBoardSquare({
          ...startingBoardSquareForPlayer,
          card: undefined,
        }));
      }
    }

    if (endingBoardSquareForPlayer) {
      dispatch(updateBoardSquare({
        ...endingBoardSquareForPlayer,
        card: {
          ...card,
          location: "boardSquare",
        },
      }));
    }
  }
})
