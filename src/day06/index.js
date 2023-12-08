import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `Time:      7  15   30
Distance:  9  40  200`;

run({
  part1: {
    tests: [{ input: testInput, expected: 288 }],
    solution: part1,
  },
  part2: {
      tests: [{ input: testInput, expected: 71503 }],
      solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});