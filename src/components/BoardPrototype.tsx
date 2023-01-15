import { useState, useEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'

import { CardType } from '../types/types'
import BoardSquare from './BoardSquare'
import Card from './Card'
import styles from './BoardPrototype.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faChessPawn, faMountainSun } from '@fortawesome/free-solid-svg-icons'

export default function BoardPrototype(props) {
    // Redux + state ---->  TODO: get rid of player2hand??? add to redux store? almost certainly
    const dispatch = useAppDispatch()
    const [player2Hand, setPlayer2Hand] = useState<CardType[]>([])

    useEffect(() => {
        console.log('you changed player 2\'s hand!')
        console.log(player2Hand);
    }, [player2Hand])

    // TODO: This should be done in a more NextJS-y way, i.e. getServerSideProps()
    async function handlePawnDeckClick() {
        // Get a random card 
        const card = await fetch('http://localhost:3001/card');
        const cardJson = await card.json();

        const unsplashImgId = cardJson.unsplashImgId;
        const cardUrl = await fetch(`http://localhost:3001/cardPhotoUrl/${unsplashImgId}`);
        const cardUrlJson = await cardUrl.json();

        cardJson['url'] = cardUrlJson.url;

        // Update hand
        setPlayer2Hand(player2Hand.concat(cardJson));
    }

    function handleMouseEnterBoard(event) {
        // console.log('board enter')
    }

    const boardSquares = Array(80).fill('').map((element, index) => {
        return (
            <BoardSquare
                id={index}
                key={index.toString()}
                name=''
                text=''
                level=''
                attack=''
                health=''
                attackPattern=''
                imgUrl=''
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
                <div className={styles.board} onMouseEnter={handleMouseEnterBoard}>
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
                <div className={styles.hand}>
                    {player2Hand.map(card => {
                        return (
                            <Card
                                name={card.name}
                                text={card.ability}
                                level={card.level}
                                attack={card.attack}
                                health={card.health}
                                attackPattern={card.attack_pattern}
                                imgUrl={card.url}
                             />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
