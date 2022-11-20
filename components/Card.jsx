import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHandBackFist, faShield } from '@fortawesome/free-solid-svg-icons'
import Pattern from './Pattern'
import styles from './Card.module.css'

export default function Card() {

    return (
        <div className={styles.container}>
            <div className={styles.card} draggable="true">
                <div className={styles.cardName}>
                    Flaming Flamingo
                </div>
                <div className={styles.cardImage}>
                    <div className={styles.cardLevel}> {/* This should be a component too -- for prototype just leaving as is */}
                        1
                    </div>
                </div>
                <div className={styles.cardText}>Heals one pawn in attack pattern instead of attacking</div>
                <div className={styles.patternAndStatsContainer}>
                    <Pattern pattern='A' />
                    <div className={styles.stats}>
                        <div className={styles.attack}>
                            <FontAwesomeIcon icon={faHandBackFist} className={`${styles.faIcon} ${styles.attackIcon}`} />
                            <div className={styles.attackNumber}>1</div>
                        </div>
                        <div className={styles.defense}>
                            <FontAwesomeIcon icon={faShield} className={`${styles.faIcon} ${styles.defenseIcon}`} />
                            <div className={styles.defenseNumber}>1</div>
                        </div>
                        <div className={styles.health}>
                            <FontAwesomeIcon icon={faHeart} className={`${styles.faIcon} ${styles.healthIcon}`} />
                            <div className={styles.healthNumber}>1</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}