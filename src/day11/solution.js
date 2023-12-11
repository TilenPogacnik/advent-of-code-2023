//Advent of code 2023
//Day 11: Cosmic Expansion

const part1 = (rawInput) => solve(rawInput, 2);
const part2 = (rawInput) => solve(rawInput, 1000000);

const solve = (rawInput, expansionFactor) => {
  const image = parseInput(rawInput);

  const expandedGalaxies = expandSpace(getGalaxies(image), expansionFactor - 1, ...findSpaceExpansions(image));

  let sum = 0;
  for (let i = 0; i < expandedGalaxies.length - 1; i++) {
    for (let j = i + 1; j < expandedGalaxies.length; j++) {
      sum += calculateDistance(expandedGalaxies[i], expandedGalaxies[j]);
    }
  }

  return sum;
}

const parseInput = (rawImage) => rawImage.split('\n').map(line => line.split('').map(el => el === '#'));

const getGalaxies = image => {
  const galaxies = [];
  for (let [row, rowData] of image.entries()) {
    for (let [column, isGalaxy] of rowData.entries()) {
      if (isGalaxy){
        galaxies.push({row, column});
      }
    }
  }
  return galaxies;
}

const findSpaceExpansions = (image) => {
  const emptyRows = [];
  for (let i = 0; i < image.length; i++) {
    if (!image[i].some(el => el)) emptyRows.push(i);
  }
  let rowExpansion = new Array(image.length).fill(0);
  for(const row of emptyRows){
    rowExpansion = rowExpansion.map((el, i) => i >= row ? el + 1 : el);
  }

  const emptyColumns = [];
  for (let i = 0; i < image[0].length; i++) {
    if (!image.map(line => line[i]).some(el => el)) emptyColumns.push(i);
  }
  let columnExpansion = new Array(image[0].length).fill(0);
  for(const column of emptyColumns){
    columnExpansion = columnExpansion.map((el, i) => i >= column ? el + 1 : el);
  }

  return [rowExpansion, columnExpansion];
}

const expandSpace = (galaxies, expansionFactor, rowExpansion, columnExpansion) => {
  galaxies.forEach(galaxy => {
    galaxy.row +=  expansionFactor * rowExpansion[galaxy.row];
    galaxy.column += expansionFactor * columnExpansion[galaxy.column];
  })
  return galaxies;
}

const calculateDistance = (from, to) => {
  return Math.abs (to.row - from.row) + Math.abs(to.column - from.column);
}

export { part1, part2 };