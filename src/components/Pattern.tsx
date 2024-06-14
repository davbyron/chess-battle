'use client'

import React from 'react';
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
    <div className="w-1/2 relative left-1 bottom-0.5 flex flex-wrap">
      {getPattern(props.pattern)}
    </div>
  )
}