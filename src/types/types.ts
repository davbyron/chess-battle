import { Prisma } from "@prisma/client";

export interface Card extends Prisma.CardUncheckedCreateInput {
  imgUrl: string
  location: "playerHand" | "opponentHand" | "boardSquare"
  uuid: string
  owner: "player" | "opponent"
  additionalClasses?: string
}

export interface BoardSquare {
  id: number
  card?: Card
  environment?: null // TODO
}

export interface HandProps {
  player: "player" | "opponent"
}

/**
 * SOCKET IO
 */

// Used when sending and broadcasting events
export interface ServerToClientEvents {
  drawCard: (card: Card, playerId: string) => void;
  discardCard: (card: Card, playerId: string) => void;
  movePawn: (card: Card, startingBoardSquareId: number | "hand", endingBoardSquareId: number, playerId: string) => void;
}

// Used when receiving events
export interface ClientToServerEvents {
  joinRoom: (roomId: string) => void;
  drawCard: (card: Card, playerId: string, roomId: string) => void;
  discardCard: (card: Card, playerId: string, roomId: string) => void;
  movePawn: (card: Card, startingBoardSquareId: number | "hand", endingBoardSquareId: number, playerId: string, roomId: string) => void;
}

// Used for inter-server communication
export interface InterServerEvents {
  ping: () => void;
}

// Types the `socket.data` attribute
export interface SocketData {
  name: string;
  age: number;
}
