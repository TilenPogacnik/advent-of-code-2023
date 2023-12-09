import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

run({
  part1: {
    tests: [{ input: testInput, expected: 114 }],
    solution: part1,
  },
  part2: {
      tests: [{ input: testInput, expected: 2 }],
      solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});