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

  // Removed obsolete out-of-range test (9000 limit no longer applies)

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
  it('should handle millions, billions, and trillions', () => {
    expect(numericsToAlpha([
      1000000,
      250000000,
      1000000000,
      1000000000000,
      1234567890
    ])).toEqual([
      { number: 1000000, alpha: 'One Million' },
      { number: 250000000, alpha: 'Two Hundred Fifty Million' },
      { number: 1000000000, alpha: 'One Billion' },
      { number: 1000000000000, alpha: 'One Trillion' },
      { number: 1234567890, alpha: 'One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety' }
    ]);
  });

  it('should handle negative large numbers', () => {
    expect(numericsToAlpha([
      -1000000,
      -1000000000,
      -1000000000000
    ])).toEqual([
      { number: -1000000, alpha: 'Negative One Million' },
      { number: -1000000000, alpha: 'Negative One Billion' },
      { number: -1000000000000, alpha: 'Negative One Trillion' }
    ]);
  });

  it('should handle edge cases with mixed scales', () => {
    expect(numericsToAlpha([
      1000001,
      1001000,
      1000000001
    ])).toEqual([
      { number: 1000001, alpha: 'One Million One' },
      { number: 1001000, alpha: 'One Million One Thousand' },
      { number: 1000000001, alpha: 'One Billion One' }
    ]);
  });
});
