'use client'

import React, { DragEvent, useMemo } from 'react';
import Image from 'next/image'

import { activateCard, deactivateCard, selectActiveBoardSquare, setAvailableBoardSquares } from '../slices/gameSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { numBoardSquaresHeight, numBoardSquaresWidth } from '../constants';

import type { Card } from '../types/types';
import Pattern from './patterns/Pattern'

import { FaHeart, FaHandBackFist, FaShield } from "react-icons/fa6";

export default function Card(props: Card) {
  const { name, level, attack, health, attackPattern, imgUrl, location } = props;
  const text = props.text === 'None' ? '' : props.text; // TODO

  const cardBgColor = useMemo(() => {
    switch (level) {
      case 1:
        return "bg-[#f08080]";
      case 2:
        return "bg-[#92c1db]";
      default:
        return "";
    }
  }, [level]);

  const dispatch = useAppDispatch()
  const activeBoardSquare = useAppSelector(selectActiveBoardSquare)

  function handleDragStart(event: DragEvent) {
    dispatch(activateCard(props))

    // Make the first three rows available to drop onto
    const numStartingBoardSquares = numBoardSquaresWidth * 3
    const startingSquares = [...Array(numStartingBoardSquares).keys()]

    const squareAdjustment = numBoardSquaresWidth * (numBoardSquaresHeight - 3)
    const startingSquaresAdjusted = startingSquares.map(square => square + squareAdjustment)
    dispatch(setAvailableBoardSquares(startingSquaresAdjusted))
  }

  function handleDragEnd(event: DragEvent) {
    if (!activeBoardSquare) dispatch(deactivateCard())
    dispatch(setAvailableBoardSquares([]))
  }

  return (
    <div
      className={`${cardBgColor} h-[200px] w-[125px] flex flex-col items-center justify-start rounded-md border-2 border-black z-20 duration-200 ${location === "playerHand" && "cursor-pointer hover:scale-[2] hover:-translate-y-32 hover:z-30 active:scale-100 active:translate-y-0 active:z-20"}`}
      draggable="true"
      onDragStart={location === "playerHand" ? handleDragStart : () => {}}
      onDragEnd={location === "playerHand" ? handleDragEnd: () => {}}
    >
      {location === "playerHand" && (
        <>
          <div className={`text-center font-semibold pointer-events-none`}>{name}</div>
          <div className="relative h-[35%] w-[90%] flex justify-center border border-black bg-cover bg-no-repeat bg-center pointer-events-none">
            <Image src={imgUrl} className="object-cover pointer-events-none" alt="Card Image" fill />
            <div className="absolute -bottom-3 w-1/5 text-[0.7em] font-semibold text-center rounded-xl border border-black bg-white"> {/* This should be a component too -- for prototype just leaving as is */}
              {level}
            </div>
          </div>
          <div className={`mt-2.5 px-2 flex items-center justify-center text-center text-[0.65em] pointer-events-none`}>{`${text}`}</div>
          <div className={`flex w-full h-1/5 mt-auto pointer-events-none`}>
            <div className="flex-1 scale-90 relative bottom-1 ">
              <Pattern pattern={attackPattern} />
            </div>
            <div className="relative flex-1">
              <div className={`h-[45%] w-[30%] absolute left-[35%] top-1/4 flex justify-center items-center text-[0.45em] font-semibold text-center text-white text-stroke-1 -translate-x-3/4 -translate-y-1/2`}>
                <FaHandBackFist className="global-icon-shadow absolute text-lg text-[#fcba03] rotate-45" />
                <div className="z-10">{attack}</div>
              </div>
              <div className={`h-[45%] w-[30%] absolute left-[35%] top-1/4 flex justify-center items-center text-[0.45em] font-semibold text-center text-white text-stroke-1 translate-x-3/4 -translate-y-1/2`}>
                <FaShield className="global-icon-shadow absolute text-lg text-[#3761d4]" />
                <div className="z-10">1</div>
              </div>
              <div className={`h-[45%] w-[30%] absolute left-[35%] top-1/4 flex justify-center items-center text-[0.45em] font-semibold text-center text-white text-stroke-1 translate-y-1/2`}>
                <FaHeart className="global-icon-shadow absolute text-lg text-[#d20209]" />
                <div className="z-10">{health}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
