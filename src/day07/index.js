import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

run({
  part1: {
    tests: [{ input: testInput, expected: 6440 }],
    solution: part1,
  },
  part2: {
      tests: [{ input: testInput, expected: 5905 }],
      solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});