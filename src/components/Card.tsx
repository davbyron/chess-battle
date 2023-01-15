import React, { DragEvent, useRef } from 'react';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHandBackFist, faShield } from '@fortawesome/free-solid-svg-icons'

import { activateCard } from '../slices/gameSlice'
import { useAppDispatch } from '../hooks'

import { CardProps } from '../types/types';
import Pattern from './Pattern'
import styles from './Card.module.css'

export default function Card(props: CardProps) {
    const { name, level, attack, health, attackPattern, imgUrl } = props
    const text = props.text == 'None' ? '' : props.text; // TODO

    const cardLevelStyle = `level${level}Card`

    const dispatch = useAppDispatch()

    function handleDragStart(event: DragEvent) {
        dispatch(activateCard(props))
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.card} ${styles[cardLevelStyle]}`} draggable="true" onDragStart={handleDragStart}>
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
