// Use `npm run dev-wss` to start
import { createServer } from "http";
import { Server } from "socket.io";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
} from "src/types/types";

const httpServer = createServer();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("✅ Connected to Socket.IO.", socket.id);

  socket.on("joinRoom", async (roomId) => {
    console.log("↙️ joinRoom");

    const socketRooms = io.of("/").adapter.sids.get(socket.id);
    if (!socketRooms?.has(roomId)) {
      socket.join(roomId);
    }
  })

  socket.on("drawCard", (card, playerId, roomId) => {
    console.log("↙️ drawCard");
    console.log("↗️ drawCard");

    // Use `io.to()...` if we need to let user who drew card also know that the event was emitted
    socket.to(roomId).emit("drawCard", card, playerId);
  });

  socket.on("movePawn", (card, startingBoardSquareId, endingBoardSquareId, playerId, roomId) => {
    console.log("↙️ movePawn");

    if (roomId === "") return;

    console.log("↗️ movePawn");
    io.to(roomId).emit("movePawn", card, startingBoardSquareId, endingBoardSquareId, playerId);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Disconnecting. Reason: ", reason);
  })
});

httpServer.listen(3001);
