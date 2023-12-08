//Advent of code 2023
//Day 01: Trebuchet?!

import { isNumber } from "../utils/index.js";

const part1 = (rawInput) => {
  const getLineNumber = line => {
    let first = -1;
    let last = 0;
    for (const char of line){
      if (isNumber(char)){
        if (first < 0) first = parseInt(char);
        last = parseInt(char);
      }
    }
    return first * 10 + last;
  }

  return parseInput(rawInput).reduce((sum, line) => sum += getLineNumber(line), 0);
};

const part2 = (rawInput) => {
  const getLineNumber = line => {
    //Each digit word is at the corresponding array index
    const wordDigits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let digitPositions = [];

    const processDigit = (digit, value) => {
      let index = line.indexOf(digit);
      let lastIndex = line.lastIndexOf(digit);
      if (index >= 0){
        digitPositions[index] = value;
      }
      if (lastIndex >= 0){
        digitPositions[lastIndex] = value;
      }
    }

    wordDigits.forEach((digit, value) => processDigit(digit, value));
    digits.forEach((digit, value) => processDigit(digit, value));
    digitPositions = digitPositions.filter(pos => pos);
    return parseInt(digitPositions[0])*10 + parseInt(digitPositions.slice(-1)[0]);
  }

  return parseInput(rawInput).reduce((sum, line) => sum += getLineNumber(line), 0);
};

const parseInput = (rawInput) => rawInput.split('\n');

export { part1, part2 };