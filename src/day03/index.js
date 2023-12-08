import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

run({
  part1: {
    tests: [{ input: testInput, expected: 4361 }],
    solution: part1,
  },
  part2: {
      tests: [{ input: testInput, expected: 467835 }],
      solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});