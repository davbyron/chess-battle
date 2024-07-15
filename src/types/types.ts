import { Prisma } from "@prisma/client";

export interface Card extends Prisma.CardUncheckedCreateInput {
  imgUrl: string
  origin?: 'hand' | 'boardSquare'
  additionalClasses?: string
}

export interface BoardSquareProps {
    id: number
}

export interface HandProps {
  player: "player" | "opponent"
}
