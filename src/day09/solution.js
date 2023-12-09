//Advent of code 2023
//Day 09: Mirage Maintenance

const part1 = (rawInput) => {
  const histories = parseInput(rawInput);

  let sum = 0;
  for(const history of histories){
    sum += getLayers(history).reduce((sum, layer) => sum + +layer.splice(-1), 0);
  }

  return sum;
};

const part2 = (rawInput) => {
  const histories = parseInput(rawInput);

  let sum = 0;
  for (const history of histories) {
    sum += getLayers(history).reverse().reduce((sum, layer) => layer[0] - sum, 0);
  }

  return sum;
}

const getLayers = (history) => {
  let layers = [history];
  let currentLayer = history;

  while (!currentLayer.every(val => val === 0)){
    let nextLayer = [];
    for (let i = 0; i < currentLayer.length - 1; i++){
      nextLayer.push(currentLayer[i + 1] - currentLayer[i]);
    }
    layers.push(nextLayer);
    currentLayer = nextLayer;
  }

  return layers;
}

const parseInput = (rawInput) => rawInput.split('\n').map(line => line.split(' ').map(num => +num));

export { part1, part2 };