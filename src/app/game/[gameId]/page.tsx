import { io } from "socket.io-client";
import { trpc } from "src/utils/trpc";

import { useAppDispatch, useAppSelector } from "src/hooks";
import { selectPlayerHand, addCardToPlayerHand } from "src/slices/gameSlice";

import Board from "src/components/Board";
import Hand from "src/components/Hand";

import { FaBolt, FaChessPawn, FaMountainSun } from "react-icons/fa6"

interface GameProps {
  params: {
    gameId: string;
  };
}

export default function Page(props: GameProps) {
  const { params } = props;
  const { gameId } = params;

  const dispatch = useAppDispatch()
  const playerHand = useAppSelector(selectPlayerHand);

  const drawCard = trpc.gameRouter.drawCard.useMutation();

  const socket = io("http://localhost:3001");

  socket.on("draw-card", (card) => {
    console.log("card was drawn: ", card);
    // TODO
  });

  async function handlePawnDeckClick() {
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

  return (
    <div className="h-full w-full flex flex-col border border-black">
      <div className="h-1/4 border border-amber-400" />
      <div className="h-1/2 flex justify-center border border-green-500">
        <div className="w-1/4 flex flex-col justify-center items-center gap-10 border border-purple-800">
          <div className="h-3/4 w-full flex items-center border border-pink-500">
            <div className="w-1/3 h-3/4 flex items-center justify-center border border-orange-200">
              <div className="flex items-center justify-center rounded-md bg-slate-300"></div>
            </div>
            <div className="w-1/3 h-3/4 flex items-center justify-center border border-orange-200">
              <div className="flex items-center justify-center rounded-md bg-slate-300"></div>
            </div>
            <div className="w-1/3 h-3/4 flex items-center justify-center border border-orange-200">
              <div className="flex items-center justify-center rounded-md bg-slate-300"></div>
            </div>
          </div>
          <button className="w-1/2 h-1/6" style={{ visibility: 'hidden' }}></button>
        </div>
        <Board />
        <div className="w-1/4 flex flex-col justify-center items-center gap-5 border border-purple-800">
          <div className="flex flex-wrap gap-2 justify-center items-center border border-pink-500">
            <div
              className="h-[200px] w-[125px] flex items-center justify-center rounded-md bg-slate-300 hover:bg-slate-200 active:bg-slate-400 cursor-pointer"
              onClick={handlePawnDeckClick}
            >
              <FaChessPawn className="text-3xl" />
            </div>
            <div className="h-[200px] w-[125px] flex items-center justify-center rounded-md bg-slate-300">
              <FaBolt className="text-3xl" />
            </div>
            <div className="h-[200px] w-[125px] flex items-center justify-center rounded-md bg-slate-300">
              <FaMountainSun className="text-3xl" />
            </div>
          </div>
          <button className="w-1/2 bg-gray-400">
            Next Turn {'>>>'}
          </button>
        </div>
      </div>
      <div className="h-1/4 w-full flex border border-blue-500">
        <div className="w-1/4 h-full flex items-center justify-center text-lg font-bold text-center border border-green-700">
          Level: 1/5
          <br />
          <br />
          Exp(?): 0/10
        </div>
        <Hand
          cards={playerHand}
          playerId={2}
        />
      </div>
    </div>
  );
}
