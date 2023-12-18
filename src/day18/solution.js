//Advent of code 2023
//Day 18: Lavaduct Lagoon

const directions = {
  'U': [0, 1],
  'R': [1, 0],
  'D': [0, -1],
  'L': [-1, 0]
}

const hexDirectionsOrder = ['R', 'D', 'L', 'U'];
const clockwiseDirectionsOrder = ['U', 'R', 'D', 'L'];

const part1 = (rawInput) => {
  const digPlan = rawInput.split('\n').map(line => line.split(' '));
  return calculateLagoonSize(digPlan);
};

const part2 = (rawInput) => {
  //Converts '(#70c710)' to ['R', 461937]
  const parseHexPoint = (hex) => [hexDirectionsOrder[+hex.charAt(hex.length - 2)], parseInt(hex.substring(2, hex.length - 2), 16)];

  const digPlan = rawInput.split('\n').map(line => parseHexPoint(line.split(' ')[2]));
  return calculateLagoonSize(digPlan);
}

const calculateLagoonSize = (digPlan) => {
  const vertices = generateVertices(digPlan);
  return calculateInnerPolygonArea(vertices) + calculateOuterPolygonArea(vertices);
}

const generateVertices = (rawPoints) => {
  const points = [new Vertex([0, 0], isClockwiseTurn(rawPoints[0], rawPoints[rawPoints.length-1][0]))];
  let currentPosition = [0, 0];
  for (let i = 0; i < rawPoints.length - 1; i++){
    const rawPoint = rawPoints[i];
    const nextDirection = rawPoints[(i + 1) % rawPoints.length][0];

    currentPosition = currentPosition.map((val, i) => val + directions[rawPoint[0]][i] * +rawPoint[1]);

    points.push(new Vertex(currentPosition, isClockwiseTurn(rawPoint[0], nextDirection)));
  }
  return points;
}

const isClockwiseTurn = (directionName, nextDirectionName) => {
  return clockwiseDirectionsOrder.indexOf(nextDirectionName) === (clockwiseDirectionsOrder.indexOf(directionName) + 1) % clockwiseDirectionsOrder.length;
}

//Use shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula) to calculate inner area of our polygon
const calculateInnerPolygonArea = (vertices) => {
  //sum xi * y i+1 - xi+1 * yi
  let sum = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    sum += vertices[i + 1].x * vertices[i].y - vertices[i].x * vertices[i + 1].y;
  }
  return 1/2 * sum;
}

const calculateOuterPolygonArea = (vertices) => {
  let edgeArea = 0;
  for (let i = 0; i < vertices.length; i++) {
    let current = vertices[i];
    let next = vertices[(i + 1) % vertices.length];
    edgeArea += 0.5 * (Math.abs(current.x - next.x) + Math.abs(current.y - next.y) - 1);
  }

  //Calculate area of outer corners
  const isClockwisePolygon = vertices.filter(v => v.isClockwiseTurn).length > vertices.length / 2;
  const cornerArea = vertices.reduce( (sum, vertex) => sum + (vertex.isClockwiseTurn === isClockwisePolygon ? 0.75 : 0.25), 0);

  return edgeArea + cornerArea;
}

class Vertex {
  constructor([x, y], isClockwiseTurn){
    this.x = x;
    this.y = y;
    this.isClockwiseTurn = isClockwiseTurn;
  }
}

export { part1, part2 };