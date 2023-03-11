import React from 'react'

import Card from './Card'
import styles from './Hand.module.css'
import { HandProps } from '../types/types'

export default function Hand(props: HandProps) {
    const { cards, playerId } = props

    return (
        <div className={styles.hand}>
            {cards.map(card => {
                return (
                    <Card
                        id={card.id}
                        name={card.name}
                        text={card.text}
                        level={card.level}
                        attack={card.attack}
                        health={card.health}
                        attackPattern={card.attackPattern}
                        imgUrl={card.imgUrl}
                        origin='hand'
                     />
                )
            })}
        </div>
    )
}