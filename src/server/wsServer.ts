// Use `npm run dev-wss` to start
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.IO.");

  socket.on("draw-card", (card) => {
    socket.emit("draw-card", card);
  });
});

httpServer.listen(3001);
