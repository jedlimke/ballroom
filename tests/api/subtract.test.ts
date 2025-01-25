import { calculateDifference } from '../../src/api/subtract';

describe('calculateDifference', () => {
  it('should return the correct difference for valid inputs', () => {
    expect(calculateDifference(30, 2)).toBe(28);
    expect(calculateDifference(0, 0)).toBe(0);
    expect(calculateDifference(-10, -5)).toBe(-5);
  });

  it('should throw an error if minuend is not a number', () => {
    expect(() => calculateDifference('30' as any, 2)).toThrow('Both minuend and subtrahend must be numbers');
  });

  it('should throw an error if subtrahend is not a number', () => {
    expect(() => calculateDifference(30, '2' as any)).toThrow('Both minuend and subtrahend must be numbers');
  });
});
