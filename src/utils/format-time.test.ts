import { describe, expect, it } from 'vitest';
import { fDate, fDateTime } from './format-time';

describe('fDate', () => {
  it('formats valid date with default format', () => {
    expect(fDate(new Date('2024-03-15'))).toMatch(/\d{2} \w{3} \d{4}/);
  });

  it('formats valid date string', () => {
    expect(fDate('2024-03-15')).toMatch(/\d{2} \w{3} \d{4}/);
  });

  it('returns empty string for null', () => {
    expect(fDate(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(fDate(undefined)).toBe('');
  });

  it('accepts custom format', () => {
    expect(fDate(new Date('2024-03-15'), 'YYYY-MM-DD')).toBe('2024-03-15');
  });
});

describe('fDateTime', () => {
  it('formats valid date with default format', () => {
    const result = fDateTime(new Date('2024-03-15T14:30:00'));
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns empty string for null', () => {
    expect(fDateTime(null)).toBe('');
  });
});
