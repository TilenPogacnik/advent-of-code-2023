//Advent of code 2023
//Day 04: Scratchcards

const part1 = (rawInput) => {
  const cards = parseInput(rawInput);
  return cards.reduce((points, card) => points + getCardValue(card), 0);
};

const part2 = (rawInput) => {
  const cards = parseInput(rawInput);

  const cardPile = Array(cards.length).fill(1);
  for (const [cardNum, card] of cards.entries()){
    const cardMatches = getMatchCount(card);
    for (let i = 1; i <= cardMatches; i++){
      cardPile[cardNum + i] += cardPile[cardNum];
    }
  }

  return cardPile.reduce((sum, cards) => sum + cards, 0);
};

const getCardValue = (card) => {
  const matchCount = getMatchCount(card);
  return matchCount > 0 ? Math.pow(2, matchCount - 1) : 0;
}

const getMatchCount = ([winningNums, cardNums]) => cardNums.filter(num => winningNums.includes(num)).length;

const parseInput = (rawInput) => rawInput.split('\n').map(card => card.split(':')[1].split('|').map(nums => nums.trim().split(' ').filter(n => n.length > 0).map(num => +num)));

export { part1, part2 };