'use client'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'

import { numBoardSquares } from '../constants/board'
import BoardSquare from './BoardSquare'
import Hand from './Hand'
import { FaBolt, FaChessPawn, FaMountainSun } from 'react-icons/fa6'
import { selectPlayer2Hand, addCardToPlayer2Hand } from '../slices/gameSlice'

export default function Board() {
  const dispatch = useAppDispatch()
  const player2Hand = useAppSelector(selectPlayer2Hand)

  useEffect(() => {
    console.log('you changed player 2\'s hand!')
    console.log(player2Hand);
  }, [player2Hand])

  async function handlePawnDeckClick() {
    try {
      // Get a random card
      const cardsRes = await fetch('http://localhost:3001/cards');
      const cards = await cardsRes.json();
      const card = cards[Math.floor(Math.random() * cards.length)];

      // Make identical to CardProps
      // TODO: Fix this in MongoDB so database matches whatever JS wants
      card['attackPattern'] = card['attack_pattern']
      card['text'] = card['ability']
      delete card['attack_pattern']
      delete card['ability']

      const cardUrlRes = await fetch(`http://localhost:3001/cardPhotoUrl/${card.unsplashImgId}`);
      const cardUrl = await cardUrlRes.json();
      card['imgUrl'] = cardUrl.url;

      dispatch(addCardToPlayer2Hand(card));
    } catch (error) {
      console.error(error);
    }
  }

  const boardSquares = Array(numBoardSquares).fill('').map((element, index) => {
    return (
      <BoardSquare
        id={index}
        key={index.toString()}
      />
    )
  })

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
        <div className="h-full w-1/2 grid grid-cols-10 grid-rows-8">
          {boardSquares}
        </div>
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
          cards={player2Hand}
          playerId={2}
        />
      </div>
    </div>
  )
}
