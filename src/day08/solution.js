//Advent of code 2023
//Day 08: Haunted Wasteland

import { lcm } from "../utils/index.js";

const part1 = (rawInput) => {
  const { lrInstructions, nodes } = parseInput(rawInput);

  return getMoveCount(nodes.get('AAA'), (node => node ==='ZZZ'), nodes, lrInstructions);
};

const part2 = (rawInput) => {
  const { lrInstructions, nodes } = parseInput(rawInput);

  const startingNodes = [];
  for (const  [key, value] of nodes.entries()){
    if (key.endsWith('A')) startingNodes.push([key, value]);
  }

  const moveCounts = [];
  for(const [, startNode] of startingNodes) {
    moveCounts.push(getMoveCount(startNode, node => node.endsWith('Z'), nodes, lrInstructions))
  }
  return lcm(moveCounts);
};

const getMoveCount = (startingNode, isTargetReached, nodes, lrInstructions) => {
  let moves = 0;
  let currentNode = startingNode;
  let targetReached = false;

  while(!targetReached){
    let move = lrInstructions[moves % lrInstructions.length];
    const nextNode = currentNode[move];
    currentNode = nodes.get(nextNode);
    moves ++;
    targetReached = isTargetReached(nextNode);
  }

  return moves;
}

const parseInput = (rawInput) => {
  const lines = rawInput.split('\n');
  const lrInstructions = lines[0].split('').map(i => +i.replace('R', 1).replace('L', 0));

  const nodes = new Map();
  for (const rawNode  of lines.slice(2)){
    nodes.set(rawNode.substring(0,3), [rawNode.substring(7,10), rawNode.substring(12,15)]);
  }
  return { lrInstructions, nodes };
}


export { part1, part2 };