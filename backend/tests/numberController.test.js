const { numericsToAlpha } = require('../utils/numberToWords');

describe('numericsToAlpha', () => {
  it('should convert numbers to their alpha representation', () => {
    expect(numericsToAlpha([1, 12, 105, 9000])).toEqual([
      { number: 1, alpha: 'One' },
      { number: 12, alpha: 'Twelve' },
      { number: 105, alpha: 'One Hundred Five' },
      { number: 9000, alpha: 'Nine Thousand' }
    ]);
  });

  it('should handle zero', () => {
    expect(numericsToAlpha([0])).toEqual([
      { number: 0, alpha: 'Zero' }
    ]);
  });

  it('should handle negative numbers', () => {
    expect(numericsToAlpha([-5, -9000])).toEqual([
      { number: -5, alpha: 'Negative Five' },
      { number: -9000, alpha: 'Negative Nine Thousand' }
    ]);
  });

  it('should handle numbers out of range gracefully', () => {
    expect(numericsToAlpha([9001, -9001])).toEqual([
      { number: 9001, alpha: 'Nine Thousand One' },
      { number: -9001, alpha: 'Negative Nine Thousand One' }
    ]);
  });

  it('should return an empty array for empty input', () => {
    expect(numericsToAlpha([])).toEqual([]);
  });

  it('should handle numbers with leading zeros', () => {
    // 007 is just 7 as a number
    expect(numericsToAlpha([7, 0o7, 0x7])).toEqual([
      { number: 7, alpha: 'Seven' },
      { number: 7, alpha: 'Seven' },
      { number: 7, alpha: 'Seven' }
    ]);
  });
});
