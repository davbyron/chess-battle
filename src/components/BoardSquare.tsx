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
  const { id } = props

  const { data: session } = useSession();

  const dispatch = useAppDispatch()
  const gameId = useAppSelector(selectGameId);
  const activeCard = useAppSelector(selectActiveCard)
  const activeBoardSquare = useAppSelector(selectActiveBoardSquare)
  const availableBoardSquares = useAppSelector(selectAvailableBoardSquares)

  const { socket } = useSocket(gameId ?? "");

  const [isActive, setIsActive] = useState<boolean>(false);
  const [cardInSquare, setCardInSquare] = useState<CardType | null>(null)
  const [showFullCard, setShowFullCard] = useState<boolean>(false)

  /**
   * When the board square is activated in the store,
   * and there is also an active card in the store,
   * sets the card in this square to the active card.
   */
  useEffect(() => {
    if (!isActive && activeBoardSquare === id && activeCard) {
      setCardInSquare(activeCard);

      dispatch(deactivateBoardSquare());
      dispatch(deactivateCard());
    }
  }, [id, isActive, activeCard, activeBoardSquare, dispatch]);

  /**
   * Dispatches an action to set the available board squares in
   * the redux store based on the attack pattern of a card.
   * @param card - Card to get attack pattern from
   * @param id - The ID of this board square
   */
  const getSquaresToActivate = useCallback((card: CardType, id: number) => {
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
    if (cardInSquare) setShowFullCard(true)
  }, [cardInSquare])

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  }

  function handleDragStart() {
    if (cardInSquare) {
      setShowFullCard(false)
      dispatch(activateCard(cardInSquare))
      getSquaresToActivate(cardInSquare, id)
    }
  }

  function handleDragEnd() {
    if (!availableBoardSquares) return;

    // If another board square was dropped on
    // and the pawn was dropped on an available square...
    if (activeBoardSquare && activeBoardSquare !== id && availableBoardSquares.includes(activeBoardSquare)) {
      setCardInSquare(null)
      dispatch(deactivateBoardSquare())
      setIsActive(false);
    }
    dispatch(setAvailableBoardSquares([]))
    dispatch(deactivateCard())
  }

  const handleDrop = (event: DragEvent) => {
    if (!availableBoardSquares) return;

    dispatch(activateBoardSquare(id))
    setIsActive(true);

    // Update card in square with active card
    // if board square is available
    if (activeCard && availableBoardSquares.includes(id)) {
      socket.emit("movePawn", activeCard, id, session?.user.id, gameId ?? "");
      setCardInSquare({ ...activeCard, location: 'boardSquare' })
      if (activeCard.location !== "boardSquare") dispatch(removeCardFromPlayerHand(activeCard))
    }

    if (activeCard && activeCard.location !== "boardSquare") dispatch(setAvailableBoardSquares([]))
    dispatch(deactivateBoardSquare());
    dispatch(deactivateCard())
    setIsActive(false);
  }

  const handleMouseLeave = () => {
    if (cardInSquare) setShowFullCard(false)
  }

  return (
    <div
      id={`${props.id}`}
      className={`relative border border-black ${availableBoardSquares && availableBoardSquares.includes(id) && 'bg-teal-200'} ${cardInSquare && "cursor-pointer"}`}
      onMouseEnter={handleMouseEnter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseLeave={handleMouseLeave}
    >
      {cardInSquare &&
        <Image src={cardInSquare.imgUrl} className="object-cover" alt="hehe" fill />
      }
      {cardInSquare && showFullCard &&
        <div className="absolute left-[110%] -bottom-1/2 z-10">
          <Card
            id={cardInSquare.id}
            name={cardInSquare.name}
            text={cardInSquare.text}
            level={cardInSquare.level}
            attack={cardInSquare.attack}
            health={cardInSquare.health}
            attackPattern={cardInSquare.attackPattern}
            movementPattern={cardInSquare.movementPattern}
            adjacencyBonus={cardInSquare.adjacencyBonus}
            weakness={cardInSquare.weakness}
            unsplashImgId={cardInSquare.unsplashImgId}
            imgUrl={cardInSquare.imgUrl}
            location="boardSquare"
          />
        </div>
      }
    </div>
  )
}
