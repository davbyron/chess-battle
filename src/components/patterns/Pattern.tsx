'use client'

import PatternA from './PatternA';
import PatternB from './PatternB';

type PatternProps = {
  pattern: string
}

export default function Pattern(props: PatternProps) {
  const getPattern = (pattern: string) => {
    switch (pattern) {
      case 'A': return <PatternA />;
      case 'B': return <PatternB />;
      default: return null;
    }
  }

  return getPattern(props.pattern);
}