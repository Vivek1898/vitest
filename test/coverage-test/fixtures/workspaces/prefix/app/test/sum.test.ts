import { expect, test } from 'vitest';
import { sum } from '../src/sum';

test('adds', () => {
  expect(sum(1, 2)).toBe(3);
})
