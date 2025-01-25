// src/api/subtract.ts
export function calculateDifference(minuend: number, subtrahend: number): number {
    if (typeof minuend !== 'number' || typeof subtrahend !== 'number') {
      throw new Error('Both minuend and subtrahend must be numbers');
    }
    return minuend - subtrahend;
  }
  