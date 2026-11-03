import { expect, test } from 'vitest';
import { double } from '../src/double';

test('doubles', () => {
  expect(double(2)).toBe(4);
})
