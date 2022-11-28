import React from 'react';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHandBackFist, faShield } from '@fortawesome/free-solid-svg-icons'
import Pattern from './Pattern'
import styles from './Card.module.css'

// import FlamingoImage from 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275'

export default function Card(props) {
    const name = props.name;
    const text = props.text == 'None' ? '' : props.text;
    const level = props.level;
    const attack = props.attack;
    const health = props.health;
    const attackPattern = props.attackPattern;

    const cardLevelStyle = `level${level}Card`

    return (
        <div className={styles.container}>
            <div className={`${styles.card} ${styles[cardLevelStyle]}`} draggable="true">
                <div className={styles.cardName}>{name}</div>
                <div className={styles.cardImage}>
                    <Image src='https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275' fill />
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