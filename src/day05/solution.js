//Advent of code 2023
//Day 05: If You Give A Seed A Fertilizer

const part1 = (rawInput) => {
  //Use range based solution from part 2 for both parts, each seed is represented as a range of length 1
  const { seeds, maps } = parseInput(rawInput);

  let ranges = [];
  for (const seed of seeds){
    ranges.push(new Range(seed, seed));
  }

  return findLowestLocation(ranges, maps);
};

const part2 = (rawInput) => {
  const { seeds, maps } = parseInput(rawInput);

  let ranges = [];
  for (let i = 0; i < seeds.length; i+=2){
    ranges.push(new Range().setStartLength(...seeds.slice(i, i+2)));
  }

  return findLowestLocation(ranges, maps);
};

const parseInput = (rawInput) => {
  const [rawSeeds, ...rawMaps] = rawInput.split('\n\n');
  const seeds = rawSeeds.split(':')[1].trim().split(' ').map(seed => +seed);
  const maps = rawMaps.map(rawMap => rawMap.split('\n').slice(1).map(mapLine => new Map(...mapLine.split(' ').map(num => +num))));
  return {seeds, maps};
}

const findLowestLocation = (ranges, maps) => {
  for (const map of maps){
    ranges = ranges.map(range => range.splitByMaps(map)).flat().map(range => range.applyMap(map));
  }

  return Math.min(...ranges.map(range => range.start));
}

class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  setStartLength(start, length) {
    this.start = start;
    this.end = start + length - 1;
    return this;
  }

  //Split the current range into smaller ranges which are all either fully covered by a single map or not covered by any maps
  splitByMaps(maps) {
    //Find ranges that are covered by maps
    let coveredRanges = [];

    for (const map of maps){
      if (map.end >= this.start && map.end < this.end){
        //map end is within range -> we should split the range
        coveredRanges.push(new Range(Math.max(map.start, this.start),map.end));
      }

      if (map.start > this.start && map.start <= this.end){
        //map start is within range -> we should split the range
        coveredRanges.push(new Range(map.start, Math.min(map.end, this.end)));
      }
    }

    if (coveredRanges.length === 0) return this;

    coveredRanges = coveredRanges.sort((a, b) => a.start - b.start);

    //Find ranges that are not covered by maps
    let unmappedRanges = [];
    if (coveredRanges[0].start > this.start){
      unmappedRanges.push(new Range(this.start, coveredRanges[0].start - 1));
    }

    for (let i = 0; i < coveredRanges.length - 1; i++){
      if (coveredRanges[i].end + 1 < coveredRanges[i + 1].start){
        unmappedRanges.push(new Range(coveredRanges[i].end + 1, coveredRanges[i + 1].start - 1));
      }
    }

    let lastMappedRange = coveredRanges.slice(-1);
    if (lastMappedRange.end < this.end){
      unmappedRanges.push(new Range(lastMappedRange.end + 1, this.end));
    }

    return [...coveredRanges, ...unmappedRanges];
  }

  //Transforms the range if it is fully covered by any of the provided maps
  applyMap(maps){
    for (const map of maps){
      if (map.start <= this.start && map.end >= this.end){
        return new Range(map.apply(this.start), map.apply(this.end));
      }
    }
    return this;
  }
}

class Map {
  constructor(destinationStart, sourceStart, rangeLength) {
    this.start = sourceStart;
    this.end = sourceStart + rangeLength - 1;
    this.translation = destinationStart - sourceStart;
  }

  apply(location){
    return location + this.translation;
  }
}

export { part1, part2 };