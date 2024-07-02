"use client"

import { numBoardSquares } from "../constants";
import BoardSquare from "./BoardSquare";

export default function Board() {
  const boardSquares = Array(numBoardSquares).fill("").map((element, index) => {
    return (
      <BoardSquare
        id={index}
        key={index.toString()}
      />
    )
  });

  return (
    <div className="h-full w-1/2 grid grid-cols-10 grid-rows-8">
      {boardSquares}
    </div>
  );
}
