'use client'

import React from 'react';
import styles from './Pattern.module.css'
import * as patterns from '../constants/attackPatterns';

type PatternProps = {
  pattern: string
}

export default function Pattern(props: PatternProps) {
  const getPattern = (pattern: string) => {
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