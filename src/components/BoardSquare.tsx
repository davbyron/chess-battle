import React, { useState, useCallback, DragEvent, MouseEvent } from 'react';
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '../hooks'

import Card from './Card';
import { BoardSquareProps, CardProps } from '../types/types';
import styles from './BoardSquare.module.css';
import { selectActiveCard, removeCardFromPlayer2Hand, deactivateCard } from '../slices/gameSlice';

export default function BoardSquare(props: BoardSquareProps) {
    const { id } = props
    
    const dispatch = useAppDispatch()
    const activeCard = useAppSelector(selectActiveCard)

    const [cardInSquare, setCardInSquare] = useState<CardProps>(null)
    const [showFullCard, setShowFullCard] = useState<boolean>(false) 

    const handleMouseEnter = useCallback((event: MouseEvent) => {
        if (cardInSquare) setShowFullCard(true)
    }, [cardInSquare])

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    }

    const handleDrop = (event: DragEvent) => {
        console.log(`handleDrop in boardSquare ${id}`)

        // Update card in square with active card
        setCardInSquare(activeCard)
        dispatch(removeCardFromPlayer2Hand(activeCard))
        dispatch(deactivateCard())
    }

    const handleMouseLeave = (event: MouseEvent) => {
        if (cardInSquare) setShowFullCard(false)
    }

    return (
        <div id={`${props.id}`} className={styles.square} onMouseEnter={handleMouseEnter} onDragOver={handleDragOver} onDrop={handleDrop} onMouseLeave={handleMouseLeave}>
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
