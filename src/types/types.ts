import { DragEventHandler } from "react"

export type CardType = {
    name: string,
    ability: string,
    level: string,
    attack: string,
    health: string,
    attack_pattern: string,
    url: string
}

// Prop types

export interface CardProps {
    name: string
    text: string
    level: string
    attack: string
    health: string
    attackPattern: string
    imgUrl: string
}

export interface BoardSquareProps extends CardProps {
    id: number
}