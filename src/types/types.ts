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
    id: string
    name: string
    text: string
    level: string
    attack: string
    health: string
    attackPattern: string
    imgUrl: string
    additionalClasses?: string
}

export interface BoardSquareProps {
    id: number
}

export interface HandProps {
    cards: CardProps[]
    playerId: number
}