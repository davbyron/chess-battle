"use client"

import { useAppSelector } from "src/hooks";
import { selectBoard } from "src/slices/gameSlice";

import BoardSquare from "./BoardSquare";

export default function Board() {
  const board = useAppSelector(selectBoard);

  const boardSquares = board.map((boardSquare, index) => {
    return (
      <BoardSquare
        id={boardSquare.id}
        card={boardSquare.card}
        key={`square-${boardSquare.id}`}
      />
    )
  });

  return (
    <div className="h-full w-1/2 grid grid-cols-10 grid-rows-8">
      {boardSquares}
    </div>
  );
}
