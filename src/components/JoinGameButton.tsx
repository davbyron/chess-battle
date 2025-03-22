"use client"

import React from "react"
import { useRouter } from "next/navigation";
import { trpc } from "src/utils/trpc"

interface JoinGameProps {
  playerId: string;
}

export default function JoinGameButton(props: JoinGameProps) {
  const { playerId } = props;
  const router = useRouter();

  const findAvailableGame = trpc.gameRouter.findAvailableGame.useMutation();
  const createNewGame = trpc.gameRouter.createGame.useMutation();

  async function onJoinGameRequest() {
    const availableGame = await findAvailableGame.mutateAsync({
      playerId,
    });

    if (!availableGame) {
      const newGame = await createNewGame.mutateAsync({
        playerId,
      });

      if (newGame) router.push(`/game/${newGame.id}`);
    } else {
      router.push(`/game/${availableGame.id}`);
    }
  }

  return (
    <button
      type="button"
      onClick={onJoinGameRequest}
      className="text-white px-5 py-2.5 rounded-lg border-2 border-black bg-linear-to-r from-orange-600 to-blue-600 hover:from-orange-500 hover:to-blue-500 active:from-orange-800 active:to-blue-800"
    >
      Join A Game
    </button>
  )
}
