//Advent of code 2023
//Day 06: Wait For It

const part1 = (rawInput) => {
  return solve(rawInput);
};

const part2 = (rawInput) => {
  return solve(rawInput.replaceAll(' ', ''));
};

const solve = input => {
  const [times, distanceRecords] = parseInput(input);

  let waysToBeatTheRecord = 1;
  for (let i = 0; i < times.length; i++){
    waysToBeatTheRecord *= findWinOptions(times[i], distanceRecords[i]);
  }

  return waysToBeatTheRecord;
}

const findWinOptions = (time, distanceRecord) => {
  const b24ac = Math.sqrt(time * time - 4 * distanceRecord);
  const maxWin = Math.ceil((time + b24ac)/2);
  const minWin = Math.floor((time - b24ac)/2);
  return maxWin - minWin - 1;
}

const parseInput = (rawInput) => {
  return rawInput.split('\n').map(line => line.split(':')[1].trim().split(' ').filter(num => num).map(num => +num));
};

export { part1, part2 };