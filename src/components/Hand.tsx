'use client'

import React, { Fragment } from 'react'

import Card from './Card'
import { HandProps } from '../types/types'

export default function Hand(props: HandProps) {
  const { cards, playerId } = props

  return (
    <div className="w-1/2 flex items-center justify-center gap-2.5 border-orange-600">
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