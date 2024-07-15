"use client";

import { io, type Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "src/types/types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

socket.on("drawCard", (card, playerId) => {
  console.log("A card was drawn by playerId: ", playerId);
  console.log("Card drawn: ", card);
})
