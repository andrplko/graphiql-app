import isValidSequenceBrackets from '@/utils/isValidSequenceBrackets';

describe('isValidSequenceBrackets', () => {
  it('should return true for valid bracket sequences', () => {
    expect(isValidSequenceBrackets('()')).toBe(true);
    expect(isValidSequenceBrackets('[()]')).toBe(true);
    expect(isValidSequenceBrackets('[{()}]')).toBe(true);
  });

  it('should return false for invalid bracket sequences', () => {
    expect(isValidSequenceBrackets('(')).toBe(false);
    expect(isValidSequenceBrackets(')(')).toBe(false);
    expect(isValidSequenceBrackets('({[})]')).toBe(false);
    expect(isValidSequenceBrackets('abc')).toBe(false);
  });

  it('should return false for mismatched bracket sequences', () => {
    expect(isValidSequenceBrackets('({[)])')).toBe(false);
    expect(isValidSequenceBrackets('{[(])}')).toBe(false);
  });
});
