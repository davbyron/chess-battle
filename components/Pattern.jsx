import React from 'react';
import styles from './Pattern.module.css'
import * as patterns from '../src/attackPatterns';

export default function Pattern(props) {
    const getPattern = (pattern) => {
        switch (pattern) {
            case 'A': return patterns.patternA;
            case 'B': return patterns.patternB;
            default: return 'none';
        }
    }

    return (
        <div className={styles.pattern}>
            {getPattern(props.pattern)}
        </div>
    )
}