import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

run({
  part1: {
    tests: [{ input: testInput, expected: 1320 }],
    solution: part1,
  },
  part2: {
      tests: [{ input: testInput, expected: 145 }],
      solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});