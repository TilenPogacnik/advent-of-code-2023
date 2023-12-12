//Advent of code 2023
//Day 12: Hot Springs

const part1 = (rawInput) => {
  const records = parseInput(rawInput, 1);
  return records.reduce((sum, record) => sum + countArrangements(record), 0);
};

const part2 = (rawInput) => {
  const records = parseInput(rawInput, 5);
  return records.reduce((sum, record) => sum + countArrangements(record), 0);
};

const parseInput = (rawInput, repeatCount) => {
  return rawInput.split('\n').map(line => {
    let springs = new Array(repeatCount).fill(line.split(' ')[0]).join('?');
    let groups = Array.from({ length: repeatCount }, () => line.split(' ')[1].split(',').map(num => + num)).flat();
    return [springs, groups];
  });
}

const cache = new Map();

const memoize = (springs, groups, result) => {
  cache.set(springs + groups.join(), result);
}

const dememoize = (springs, groups) => {
  const cacheKey = springs + groups.join();
  return cache.has(cacheKey) ? cache.get(cacheKey) : -1;
}

function countArrangements([springs, inGroups]){
  const cachedResult = dememoize(springs, inGroups);
  if (cachedResult >= 0) return cachedResult;

  if (inGroups.length === 0) return springs.includes('#') ? 0 : 1

  springs = springs.replace(/^\.+/, ''); //Drop starting dots
  if (springs.length === 0) return 0;

  const groups = [...inGroups];
  const group = groups.shift();
  let result = 0;

  if (springs.startsWith('#')){
    if (!canStartWithDamagedGroup(springs, group)){
      //We cant fit the current group, but we should be able to because it starts with # -> invalid arrangement
      result = 0;
    } else {
      result = countArrangements([springs.substring(group + 1), groups]);
    }
  }

  if (springs.startsWith('?')){
    if (!canStartWithDamagedGroup(springs, group)){
      result = countArrangements([springs.substring(1), [group, ...groups]]);
    } else {
      //Split, count arrangmeents where we place a group and not
      result = countArrangements([springs.substring(group + 1), groups]) + countArrangements([springs.substring(1), [group, ...groups]]);
    }
  }

  memoize(springs, inGroups, result);
  return result;
}

function canStartWithDamagedGroup(springs, groupSize){
  return new RegExp(`^[#?]{${groupSize}}(?:[.?]|$)`).test(springs);
}

export { part1, part2 };