'use client'

import React, { Fragment } from 'react'

import Card from './Card'
import styles from './Hand.module.css'
import { HandProps } from '../types/types'

export default function Hand(props: HandProps) {
    const { cards, playerId } = props

    return (
        <div className={styles.hand}>
            {cards.map((card, index) => {
                return (
                  <Fragment key={card.name + index}>
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
                  </Fragment>
                )
            })}
        </div>
    )
}