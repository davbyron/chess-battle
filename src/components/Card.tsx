import React from 'react';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHandBackFist, faShield } from '@fortawesome/free-solid-svg-icons'
import Pattern from './Pattern'
import styles from './Card.module.css'

type CardProps = {
    name: string,
    text: string,
    level: string,
    attack: string,
    health: string,
    attackPattern: string,
    imgUrl: string
}

export default function Card(props: CardProps) {
    const name = props.name;
    const text = props.text == 'None' ? '' : props.text;
    const level = props.level;
    const attack = props.attack;
    const health = props.health;
    const attackPattern = props.attackPattern;
    const imgUrl = props.imgUrl;

    const cardLevelStyle = `level${level}Card`

    return (
        <div className={styles.container}>
            <div className={`${styles.card} ${styles[cardLevelStyle]}`} draggable="true">
                <div className={styles.cardName}>{name}</div>
                <div className={styles.cardImageContainer}>
                    <Image src={imgUrl} className={styles.cardImage} alt="Card Image" fill />
                    <div className={styles.cardLevel}> {/* This should be a component too -- for prototype just leaving as is */}
                        {level}
                    </div>
                </div>
                <div className={styles.cardText}>{`${text}`}</div>
                <div className={styles.patternAndStatsContainer}>
                    <Pattern pattern={`${attackPattern}`} />
                    <div className={styles.stats}>
                        <div className={styles.attack}>
                            <FontAwesomeIcon icon={faHandBackFist} className={`${styles.faIcon} ${styles.attackIcon}`} />
                            <div className={styles.attackNumber}>{attack}</div>
                        </div>
                        <div className={styles.defense}>
                            <FontAwesomeIcon icon={faShield} className={`${styles.faIcon} ${styles.defenseIcon}`} />
                            <div className={styles.defenseNumber}>1</div>
                        </div>
                        <div className={styles.health}>
                            <FontAwesomeIcon icon={faHeart} className={`${styles.faIcon} ${styles.healthIcon}`} />
                            <div className={styles.healthNumber}>{health}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}