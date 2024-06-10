'use client'

import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'

import { numBoardSquares } from '../constants/board'
import BoardSquare from './BoardSquare'
import Hand from './Hand'
import styles from './Board.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faChessPawn, faMountainSun } from '@fortawesome/free-solid-svg-icons'
import { selectPlayer2Hand, addCardToPlayer2Hand } from '../slices/gameSlice'

export default function Board(props) {
    const dispatch = useAppDispatch()
    const player2Hand = useAppSelector(selectPlayer2Hand)

    useEffect(() => {
        console.log('you changed player 2\'s hand!')
        console.log(player2Hand);
    }, [player2Hand])

    async function handlePawnDeckClick() {
      try {
        // Get a random card
        const cardsRes = await fetch('http://localhost:3001/cards');
        const cards = await cardsRes.json();
        const card = cards[Math.floor(Math.random() * cards.length)];

        // Make identical to CardProps
        // TODO: Fix this in MongoDB so database matches whatever JS wants
        card['attackPattern'] = card['attack_pattern']
        card['text'] = card['ability']
        delete card['attack_pattern']
        delete card['ability']

        const cardUrlRes = await fetch(`http://localhost:3001/cardPhotoUrl/${card.unsplashImgId}`);
        const cardUrl = await cardUrlRes.json();
        card['imgUrl'] = cardUrl.url;

        dispatch(addCardToPlayer2Hand(card));
      } catch (error) {
        console.error(error);
      }
    }

    const boardSquares = Array(numBoardSquares).fill('').map((element, index) => {
        return (
            <BoardSquare
                id={index}
                key={index.toString()}
             />
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.player1}>
                
            </div>
            <div className={styles.middleground}>
                <div className={`player1-panel ${styles.middlegroundPanel}`}>
                    <div className={styles.decks}>
                        <div className={styles.deckContainer}>
                            <div className={`${styles.deck} pawnDeck`}></div>
                        </div>
                        <div className={styles.deckContainer}>
                            <div className={`${styles.deck} effectDeck`}></div>
                        </div>
                        <div className={styles.deckContainer}>
                            <div className={`${styles.deck} terrainDeck`}></div>
                        </div>
                    </div>
                    <button className={styles.nextTurn} style={{visibility: 'hidden'}}></button>
                </div>
                <div className={styles.board}>
                    {boardSquares}
                </div>
                <div className={`player2-panel ${styles.middlegroundPanel}`}>
                    <div className={styles.decks}>
                        <div className={styles.deckContainer}>
                            <div className={`${styles.deck} pawnDeck`} onClick={handlePawnDeckClick}>
                                <FontAwesomeIcon icon={faChessPawn} size='2x' />
                            </div>
                        </div>
                        <div className={styles.deckContainer}>
                            <div className={`${styles.deck} effect-deck`}>
                                <FontAwesomeIcon icon={faBolt} size='2x' />
                            </div>
                        </div>
                        <div className={styles.deckContainer}>
                            <div className={`${styles.deck} terrainDeck`}>
                                <FontAwesomeIcon icon={faMountainSun} size='2x' />
                            </div>
                        </div>
                    </div>
                    <button className={styles.nextTurn}>
                        Next Turn {'>>>'}
                    </button>
                </div>
            </div>
            <div className={styles.player2}>
                <div className={styles.levelContainer}>
                    Level: 1/5
                    <br/>
                    <br/>
                    Exp(?): 0/10
                </div>
                <Hand
                    cards={player2Hand}
                    playerId={2}
                />
            </div>
        </div>
    )
}
