import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

run({
  part1: {
    tests: [{ input: testInput, expected: 21 }],
    solution: part1,
  },
  part2: {
      tests: [{ input: testInput, expected: 525152 }],
      solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});