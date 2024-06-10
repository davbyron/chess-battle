'use client'

import React, { useState, useCallback, DragEvent, MouseEvent } from 'react';
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '../hooks'

import Card from './Card';
import { BoardSquareProps, CardProps } from '../types/types';
import styles from './BoardSquare.module.css';
import {
    selectActiveCard,
    selectActiveBoardSquare,
    removeCardFromPlayer2Hand,
    activateBoardSquare,
    deactivateBoardSquare,
    activateCard,
    deactivateCard,
    selectAvailableBoardSquares,
    setAvailableBoardSquares
} from '../slices/gameSlice';
import { numBoardSquaresWidth } from '../constants/board';

export default function BoardSquare(props: BoardSquareProps) {
    const { id } = props
    
    const dispatch = useAppDispatch()
    const activeCard = useAppSelector(selectActiveCard)
    const activeBoardSquare = useAppSelector(selectActiveBoardSquare)
    const availableBoardSquares = useAppSelector(selectAvailableBoardSquares)

    const [cardInSquare, setCardInSquare] = useState<CardProps>(null)
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
        if (cardInSquare) setShowFullCard(true)
    }, [cardInSquare])

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    }

    function handleDragStart() {
        if (cardInSquare) setShowFullCard(false)
        dispatch(activateCard(cardInSquare))
        getSquaresToActivate(cardInSquare, id)
    }

    function handleDragEnd() {
        if (!availableBoardSquares) return;

        // If another board square was dropped on
        // and the pawn was dropped on an available square...
        if (activeBoardSquare !== id && availableBoardSquares.includes(activeBoardSquare)) {
            setCardInSquare(null)
            dispatch(deactivateBoardSquare())
        }
        dispatch(setAvailableBoardSquares([]))
        dispatch(deactivateCard())
    }

    const handleDrop = (event: DragEvent) => {
        if (!availableBoardSquares) return;

        dispatch(activateBoardSquare(id))

        // Update card in square with active card
        // if board square is available
        if (availableBoardSquares.includes(id)) {
            setCardInSquare({ ...activeCard, origin: 'boardSquare'})
            if (activeCard.origin === 'hand') dispatch(removeCardFromPlayer2Hand(activeCard))
        }

        if (activeCard.origin === 'hand') dispatch(setAvailableBoardSquares([]))
        dispatch(deactivateCard())
    }

    const handleMouseLeave = () => {
        if (cardInSquare) setShowFullCard(false)
    }

    return (
        <div
            id={`${props.id}`}
            className={`${styles.square} ${availableBoardSquares && availableBoardSquares.includes(id) ? styles.availableSquare : ''}`}
            onMouseEnter={handleMouseEnter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onMouseLeave={handleMouseLeave}
        >
            { cardInSquare && 
                <Image src={cardInSquare.imgUrl} className={styles.boardSquareImage} alt='hehe' fill />
            }
            { cardInSquare && showFullCard && 
                <Card
                    additionalClasses={styles.hoverCard}
                    id={cardInSquare.id}
                    name={cardInSquare.name}
                    text={cardInSquare.text}
                    level={cardInSquare.level}
                    attack={cardInSquare.attack}
                    health={cardInSquare.health}
                    attackPattern={cardInSquare.attackPattern}
                    imgUrl={cardInSquare.imgUrl}
                />
            }
        </div>
    )
}
