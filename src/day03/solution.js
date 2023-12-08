//Advent of code 2023
//Day 03: Gear Ratios

import { isNumber } from "../utils/index.js";

const part1 = (rawInput) => {
  const { numbers, symbols } = parseInput(rawInput);

  let sum = 0;
  for (const number of numbers){
    if (symbols.some(symbol => isAdjacent(symbol, number))){
      sum += number.value;
    }
  }
  return sum;
};

const part2 = (rawInput) => {
  const {numbers, symbols } = parseInput(rawInput);

  let sum = 0;
  for (const gearSymbol of symbols.filter(symbol => symbol.value === '*')){
    const gearParts = numbers.filter(number => isAdjacent(gearSymbol, number));
    if (gearParts.length === 2){
      sum += gearParts[0].value * gearParts[1].value;
    }
  }
  return sum;
};

const isAdjacent = (symbol, number) => {
  return Math.abs(symbol.row - number.row) <= 1 && symbol.column >= (number.column - 1) && symbol.column <= (number.column + number.value.toString().length);
}

const parseInput = (rawInput) => {
  const schematic = rawInput.split('\n');
  return {numbers: parseNumbers(schematic), symbols: parseSymbols(schematic)};
}

const parseSymbols = (schematic) => {
  const symbols = [];
  for (const [i, row] of schematic.entries()){
    for (const [j, field] of row.split('').entries()){
      if (isSymbol(field)){
        symbols.push({value: field, row: i, column: j});
      }
    }
  }
  return symbols;
}

const isSymbol = (field) => {
  return field !== '.' && !isNumber(field);
}

const parseNumbers = (schematic) => {
  const numbers = [];
  for (let [i, row] of schematic.entries()){
    let rawNumbers = row.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e)).filter(n => n);
    for (const number of rawNumbers){
      numbers.push({value: number, row: i, column: row.indexOf(number)});

      //Erase processed number to prevent errors when a number is included in earlier number (example: ...123...23..., indexOf(23) would return 4 instead of 9
      row = row.replace(number, '.'.repeat(number.toString().length));
    }
  }
  return numbers;
}

export { part1, part2 };