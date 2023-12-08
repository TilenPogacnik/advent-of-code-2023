import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const testInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

run({
  part1: {
    tests: [{ input: testInput, expected: 142 }],
    solution: part1,
  },
  part2: {
      tests: [{ input: testInput2, expected: 281 }],
      solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});