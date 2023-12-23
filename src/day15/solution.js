//Advent of code 2023
//Day 15: Lens Library

const HASH_MULTIPLIER = 17;
const HASH_RANGE = 256;
const hashAlgorithm = (inputString) => inputString.split('').reduce((sum, char) =>  HASH_MULTIPLIER * (sum + char.charCodeAt(0)) % HASH_RANGE, 0);

const part1 = (rawInput) => rawInput.split(',').reduce((sum, step) => sum + hashAlgorithm(step), 0);

const part2 = (rawInput) => {
  const steps = parseInput(rawInput);
  const boxes = fillBoxes(steps);
  return getFocusingPower(boxes);
};

const parseInput = (rawInput) => rawInput.split(',').map(rawStep => rawStep.split(/[=-]/));

const fillBoxes = steps => {
  const boxes = Array(HASH_RANGE).fill(0).map(() => []);

  for (const step of steps){
    const hash = hashAlgorithm(step[0])
    const index = boxes[hash].findIndex(lens => lens[0] === step[0]);

    if (step[1]){
      if (index >= 0){
        boxes[hash][index] = step;
      } else {
        boxes[hash].push(step);
      }
    } else {
      if (index >= 0){
        boxes[hash].splice(index, 1);
      }
    }
  }

  return boxes;
}

const getFocusingPower = boxes => {
  let focusingPower = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let ii = 0; ii < boxes[i].length; ii++){
      focusingPower += (i + 1) * (ii + 1) * boxes[i][ii][1];
    }
  }

  return focusingPower;
}

export { part1, part2 };