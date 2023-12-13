//Advent of code 2023
//Day 13: Point of Incidence

const part1 = (rawInput) => {
  return solve(rawInput, 0);
};

const part2 = (rawInput) => {
  return solve(rawInput, 1);
};

const parseInput = (rawInput) => rawInput.split('\n\n').map(pattern => pattern.split('\n'));

const solve = (rawInput, smudgeCount) => {
  return parseInput(rawInput).reduce((sum, pattern) => sum + getMirrorPosition(pattern,smudgeCount) + 100* getMirrorPosition(rotate(pattern), smudgeCount), 0);
}

//Returns mirror position with matching smudgeCount. Returns 0 if no mirror was found.
const getMirrorPosition = (pattern, smudgeCount) => {
  for (let mirrorCandidate = 1; mirrorCandidate < pattern[0].length; mirrorCandidate++) {
    const smudges = pattern.reduce((sum, line) => sum + countSmudges(line, mirrorCandidate), 0);
    if (smudges === smudgeCount) return mirrorCandidate;
  }
  return 0;
}

//Count differences between left and right side of mirror
const countSmudges = (line, mirrorPosition) => {
  const minLength = Math.min(line.length - mirrorPosition, mirrorPosition);
  const leftMirrored = line.slice(0, mirrorPosition).split('').reverse().slice(0, minLength);
  const right = line.slice(mirrorPosition).split('').slice(0, minLength);
  return leftMirrored.reduce((sum, dot, i) => sum + (dot !== right[i] ? 1 : 0), 0);
}

function rotate(pattern) {
  const transposedPattern = [];
  for (let i = 0; i < pattern[0].length; i++){
    transposedPattern.push(pattern.map(line => line.charAt(i)).join(''));
  }
  return transposedPattern;
}

export { part1, part2 };