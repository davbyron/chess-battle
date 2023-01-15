import React, { useState, DragEvent, MouseEvent } from 'react';
import Image from 'next/image'

import { useAppSelector } from '../hooks'

import Card from './Card';
import { BoardSquareProps, CardProps } from '../types/types';
import styles from './BoardSquare.module.css';
import { selectActiveCard } from '../slices/gameSlice';

export default function BoardSquare(props: BoardSquareProps) {
    const { id } = props
    
    const activeCard = useAppSelector(selectActiveCard)

    const [cardInSquare, setCardInSquare] = useState<CardProps>(null)
    const [showFullCard, setShowFullCard] = useState<boolean>(false) 
    console.log(`rendered board square! this: ${id}`)

    const handleMouseEnter = (event: MouseEvent) => {
        if (cardInSquare) setShowFullCard(true)
    }

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault();
    }

    const handleDrop = (event: DragEvent) => {
        console.log(`handleDrop in boardSquare ${id}`)

        // Update card in square with active card
        setCardInSquare(activeCard)
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
