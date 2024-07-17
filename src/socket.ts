"use client";

import { io, type Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "src/types/types";
import { getSession } from "next-auth/react";
import { dispatch, getState } from "src/store";
import { addCardToOpponentHand } from "src/slices/gameSlice";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

/**
 * Adds a card to the opponent's hand
 */
socket.on("drawCard", async (card, playerId) => {
  const session = await getSession();
  if (session?.user.id !== playerId) dispatch(addCardToOpponentHand(card));
})
