import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { socket } from './socket'

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSocket = (roomId: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      // console.log("Running onConnect in useSocket...");

      if (!socket.connected) {
        console.log("Socket is not connected. Connecting and joining room")
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name || "N/A");

        socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
        });
      }

      if (!room) {
        socket.emit("joinRoom", roomId);
        setRoom(roomId);
      }
    }

    function onDisconnect() {
      console.log("Disconnected from socket on client.")

      setIsConnected(false);
      setTransport("N/A")
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [room, roomId]);

  return {
    socket,
    isConnected,
    transport,
  }
}