export type CardType = {
    name: string,
    ability: string,
    level: number,
    attack: number,
    health: number,
    attack_pattern: string,
    url: string
}

// Prop types

export interface CardProps {
    id: number
    name: string
    text: string
    level: number
    attack: number
    health: number
    attackPattern: string
    imgUrl: string
    origin?: 'hand' | 'boardSquare'
    additionalClasses?: string
}

export interface BoardSquareProps {
    id: number
}

export interface HandProps {
    cards: CardProps[]
    playerId: number
}