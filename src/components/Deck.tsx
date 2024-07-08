"use client"

import { io, type Socket } from "socket.io-client";
import { trpc } from "src/utils/trpc";

import { useAppDispatch } from "src/hooks";
import { addCardToPlayerHand } from "src/slices/gameSlice";

import { FaBolt, FaChessPawn, FaMountainSun } from "react-icons/fa6";

interface DeckProps {
  type: "pawn" | "event" | "environment";
  owner: "player" | "opponent";
}

export default function Deck(props: DeckProps) {
  const { type, owner } = props;

  const socket = io("http://localhost:3001");

  const dispatch = useAppDispatch();

  const drawCard = trpc.gameRouter.drawCard.useMutation();

  socket.on("draw-card", (card) => {
    console.log("card was drawn: ", card);
    // TODO
  });

  async function handleDeckClick() {
    if (owner === "player" && type === "pawn") {
      try {
        // Get a random card
        const card = await drawCard.mutateAsync();
        if (card) dispatch(addCardToPlayerHand(card));
  
        socket.emit("draw-card", {
          player: "1", // TODO
          card: card,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div
      className={`h-[120px] w-[75px] lg:h-[200px] lg:w-[125px] flex items-center justify-center rounded-md bg-slate-300 ${owner === "player" ? "hover:bg-slate-200 active:bg-slate-400 cursor-pointer" : "opacity-50"}`}
      onClick={handleDeckClick}
    >
      {type === "pawn" ? (
        <FaChessPawn className="text-3xl" />
      ) : type === "event" ? (
        <FaBolt className="text-3xl" />
      ) : (
        <FaMountainSun className="text-3xl" />
      )}
    </div>
  )
}