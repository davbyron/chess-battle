import React, { useState, DragEvent, MouseEvent, DragEventHandler } from 'react';
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../hooks'

import { BoardSquareProps, CardProps } from '../types/types';
import styles from './BoardSquare.module.css';
import { activateBoardSquare, selectActiveBoardSquare, selectActiveCard } from '../slices/gameSlice';

export default function BoardSquare(props: BoardSquareProps) {
    const {
        id,
        name,
        text,
        level,
        attack,
        health,
        attackPattern,
        imgUrl
    } = props
    
    const dispatch = useAppDispatch()
    const activeCard = useAppSelector(selectActiveCard)

    const [cardInSquare, setCardInSquare] = useState<CardProps>(null)
    console.log(`rendered board square! this: ${id}`)

    const handleMouseEnter = (event: MouseEvent) => {
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
        const target = event.target as HTMLDivElement;
    }

    return (
        <div id={`${props.id}`} className={styles.square} onMouseEnter={handleMouseEnter} onDragOver={handleDragOver} onDrop={handleDrop} onMouseLeave={handleMouseLeave}>
            { cardInSquare && 
                <Image src={cardInSquare.imgUrl} className={styles.boardSquareImage} alt='hehe' height={50} width={50} />
            }
        </div>
    )
}
