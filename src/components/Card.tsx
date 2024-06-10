'use client'

import React, { DragEvent } from 'react';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHandBackFist, faShield } from '@fortawesome/free-solid-svg-icons'

import { activateCard, deactivateCard, selectActiveBoardSquare, setAvailableBoardSquares } from '../slices/gameSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { numBoardSquaresHeight, numBoardSquaresWidth } from '../constants/board';

import { CardProps } from '../types/types';
import Pattern from './Pattern'
import styles from './Card.module.css'

export default function Card(props: CardProps) {
  const { additionalClasses, name, level, attack, health, attackPattern, imgUrl } = props
  const text = props.text === 'None' ? '' : props.text; // TODO

  const cardLevelStyle = `level${level}Card`

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
    <div key={name} className={`${styles.container} ${additionalClasses}`}>
      <div className={`${styles.card} ${styles[cardLevelStyle]}`} draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={`${styles.cardName} ${styles.noPointerEvents}`}>{name}</div>
        <div className={styles.cardImageContainer}>
          <Image src={imgUrl} className={styles.cardImage} alt="Card Image" fill />
          <div className={styles.cardLevel}> {/* This should be a component too -- for prototype just leaving as is */}
            {level}
          </div>
        </div>
        <div className={`${styles.cardText} ${styles.noPointerEvents}`}>{`${text}`}</div>
        <div className={`${styles.patternAndStatsContainer} ${styles.noPointerEvents}`}>
          <Pattern pattern={`${attackPattern}`} />
          <div className={styles.stats}>
            <div className={styles.attack}>
              <FontAwesomeIcon icon={faHandBackFist} className={`${styles.faIcon} ${styles.attackIcon}`} />
              <div className={styles.attackNumber}>{attack}</div>
            </div>
            <div className={styles.defense}>
              <FontAwesomeIcon icon={faShield} className={`${styles.faIcon} ${styles.defenseIcon}`} />
              <div className={styles.defenseNumber}>1</div>
            </div>
            <div className={styles.health}>
              <FontAwesomeIcon icon={faHeart} className={`${styles.faIcon} ${styles.healthIcon}`} />
              <div className={styles.healthNumber}>{health}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
