'use client'

import React, { useState, useCallback, useEffect, DragEvent, MouseEvent } from 'react';
import Image from 'next/image'

import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector, useSocket } from '../hooks'

import Card from './Card';
import { BoardSquare as BoardSquareProps, Card as CardProps } from '../types/types';
import {
  selectGameId,
  selectActiveCard,
  selectActiveBoardSquare,
  removeCardFromPlayerHand,
  activateBoardSquare,
  deactivateBoardSquare,
  activateCard,
  deactivateCard,
  selectAvailableBoardSquares,
  setAvailableBoardSquares
} from '../slices/gameSlice';
import { numBoardSquaresWidth } from '../constants';

export default function BoardSquare(props: BoardSquareProps) {
  const { id, card } = props

  const { data: session } = useSession();

  const dispatch = useAppDispatch()
  const gameId = useAppSelector(selectGameId);
  const activeCard = useAppSelector(selectActiveCard)
  const activeBoardSquare = useAppSelector(selectActiveBoardSquare)
  const availableBoardSquares = useAppSelector(selectAvailableBoardSquares)

  const { socket } = useSocket(gameId ?? "");

  const [showFullCard, setShowFullCard] = useState<boolean>(false)

  /**
   * Dispatches an action to set the available board squares in
   * the redux store based on the attack pattern of a card.
   * @param card - Card to get attack pattern from
   * @param id - The ID of this board square
   */
  const getSquaresToActivate = useCallback((card: CardProps, id: number) => {
    const squaresToMakeAvailable: number[] = []
    const attackPattern: string = card.attackPattern

    if (attackPattern === 'A') {
      squaresToMakeAvailable.push(id - numBoardSquaresWidth - 1)
      squaresToMakeAvailable.push(id - numBoardSquaresWidth)
      squaresToMakeAvailable.push(id - numBoardSquaresWidth + 1)

      dispatch(setAvailableBoardSquares(squaresToMakeAvailable))
    }

    if (attackPattern === 'B') {
      squaresToMakeAvailable.push(id - numBoardSquaresWidth - 1)
      squaresToMakeAvailable.push(id - numBoardSquaresWidth)
      squaresToMakeAvailable.push(id - numBoardSquaresWidth + 1)
      squaresToMakeAvailable.push(id - 1)
      squaresToMakeAvailable.push(id + 1)
      squaresToMakeAvailable.push(id + numBoardSquaresWidth - 1)
      squaresToMakeAvailable.push(id + numBoardSquaresWidth)
      squaresToMakeAvailable.push(id + numBoardSquaresWidth + 1)

      dispatch(setAvailableBoardSquares(squaresToMakeAvailable))
    }
  }, [dispatch])

  const handleMouseEnter = useCallback((event: MouseEvent) => {
    if (card) setShowFullCard(true)
  }, [card])

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  }

  function handleDragStart() {
    if (card) {
      setShowFullCard(false)
      dispatch(activateCard(card))
      dispatch(activateBoardSquare(id))

      // Should be getSquaresToSetAvailable
      getSquaresToActivate(card, id)
    }
  }

  function handleDragEnd() {
    if (!availableBoardSquares || !activeBoardSquare) return;

    deactivateBoardSquare();
  }

  const handleDrop = (event: DragEvent) => {
    if (!availableBoardSquares) return;

    // Update card in square with active card
    // if board square is available
    if (activeCard && availableBoardSquares.includes(id)) {
      // If the card is coming from a hand, emit `discardCard` event
      if (activeCard.location !== "boardSquare") {
        socket.emit("discardCard", activeCard, session?.user.id, gameId ?? "");
      }

      // Emit move pawn event
      socket.emit("movePawn", activeCard, activeBoardSquare ?? "hand", id, session?.user.id, gameId ?? "");
    }

    dispatch(setAvailableBoardSquares([]));
    dispatch(deactivateBoardSquare());
    dispatch(deactivateCard());
  }

  const handleMouseLeave = () => {
    if (card) setShowFullCard(false)
  }

  return (
    <div
      id={`${props.id}`}
      className={`relative border border-black ${availableBoardSquares && availableBoardSquares.includes(id) && 'bg-teal-200'} ${card && "cursor-pointer"}`}
      onMouseEnter={handleMouseEnter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseLeave={handleMouseLeave}
    >
      {card &&
        <Image src={card.imgUrl} className="object-cover" alt="hehe" fill />
      }
      {card && showFullCard &&
        <div className="absolute left-[110%] -bottom-1/2 z-10">
          <Card
            id={card.id}
            name={card.name}
            text={card.text}
            level={card.level}
            attack={card.attack}
            health={card.health}
            attackPattern={card.attackPattern}
            movementPattern={card.movementPattern}
            adjacencyBonus={card.adjacencyBonus}
            weakness={card.weakness}
            unsplashImgId={card.unsplashImgId}
            imgUrl={card.imgUrl}
            location="boardSquare"
          />
        </div>
      }
    </div>
  )
}
