import Board from "src/components/Board";
import Deck from "src/components/Deck";
import Hand from "src/components/Hand";

interface GameProps {
  params: {
    gameId: string;
  };
}

export default function Page(props: GameProps) {
  const { params } = props;
  const { gameId } = params;

  return (
    <div className="h-full w-full flex flex-col border border-black">
      <div className="h-1/4  w-full flex border border-amber-400">
        <div className="w-1/4 h-full flex flex-col items-center justify-center text-lg font-bold text-center border border-green-700">
          <p>Opponent</p>
          <p>Level: 1/5</p>
          <p>Exp(?): 0/10</p>
        </div>
        <Hand player="opponent" />
      </div>
      <div className="h-1/2 flex justify-center border border-green-500">
        <div className="flex flex-col justify-center items-center gap-10 border border-purple-800">
          <div className="flex flex-wrap gap-2 justify-center items-center border border-pink-500">
            <Deck type="pawn" owner="opponent" gameId={gameId} />
            <Deck type="event" owner="opponent" gameId={gameId} />
            <Deck type="environment" owner="opponent" gameId={gameId} />
          </div>
        </div>
        <Board />
        <div className="flex flex-col justify-center items-center gap-5 border border-purple-800">
          <div className="flex flex-wrap gap-2 justify-center items-center border border-pink-500">
            <Deck type="pawn" owner="player" gameId={gameId} />
            <Deck type="event" owner="player" gameId={gameId} />
            <Deck type="environment" owner="player" gameId={gameId} />
          </div>
          <button className="w-1/2 bg-gray-400">
            Next Turn {'>>>'}
          </button>
        </div>
      </div>
      <div className="h-1/4 w-full flex border border-blue-500">
        <div className="w-1/4 h-full flex flex-col items-center justify-center text-lg font-bold text-center border border-green-700">
          <p>You</p>
          <p>Level: 1/5</p>
          <p>Exp(?): 0/10</p>
        </div>
        <Hand player="player" />
      </div>
    </div>
  );
}
