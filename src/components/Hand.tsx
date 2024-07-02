"use client"

import React, { Fragment } from "react";

import { useAppSelector } from "src/hooks";
import { selectPlayerHand } from "src/slices/gameSlice";

import Card from "./Card";
import { HandProps } from "../types/types";

export default function Hand(props: HandProps) {
  const { playerId } = props;

  const playerHand = useAppSelector(selectPlayerHand);

  return (
    <div className="w-1/2 flex items-center justify-center gap-2.5 border-orange-600">
      {playerHand.map((card, index) => {
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
              movementPattern={card.movementPattern}
              adjacencyBonus={card.adjacencyBonus}
              weakness={card.weakness}
              unsplashImgId={card.unsplashImgId}
              imgUrl={card.imgUrl}
              origin='hand'
            />
          </Fragment>
        )
      })}
    </div>
  )
}