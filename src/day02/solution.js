//Advent of code 2023
//Day 02: Cube Conundrum

const part1 = (rawInput) => {
  const games = parseInput(rawInput);
  const maxCubeCount = {'red': 12, 'green': 13, 'blue': 14};

  let sum = 0;
  for (const game of games){
    if(isGamePossible(game, maxCubeCount)){
      sum += game.number;
    }
  }
  return sum;
};
const part2 = (rawInput) => {
  const games = parseInput(rawInput);
  return games.reduce((sum, game) => sum + getGamePower(game), 0);
};

const parseInput = (rawInput) => rawInput.split('\n').map(line => {
  return {
    number: +line.split(':')[0].split(' ')[1],
    rounds: line.split(':')[1].replaceAll(';', ',').split(',').map(el => el.trim().split(' ')).map(round => [+round[0], round[1]])
  };
});

const isGamePossible = (game, maxCubeCount) => {
  return game.rounds.every(round => round[0] <= maxCubeCount[round[1]]);
}

const getGamePower = (game) => {
  const maxCubeCount = {'red': 0, 'green': 0, 'blue': 0};

  for (const round of game.rounds){
    if (round[0] > maxCubeCount[round[1]]){
      maxCubeCount[round[1]] = round[0];
    }
  }

  return Object.entries(maxCubeCount).reduce((sum, [, value]) => sum *= value, 1);
}

export { part1, part2 };