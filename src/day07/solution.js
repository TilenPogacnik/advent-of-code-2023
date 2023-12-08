//Advent of code 2023
//Day 07: Camel Cards

const part1 = (rawInput) => {
  return calculateWinnings(rawInput, false);
};

const part2 = (rawInput) => {
  return calculateWinnings(rawInput,true);
};

const calculateWinnings = (rawInput, useJokers) => {
  const cardTypes = useJokers ? ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
    : ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  const sortedHands = rawInput.split('\n')
    .map(line => new Hand(line, useJokers))
    .sort((a, b) => a.compareTo(b, cardTypes));

  let sum = 0;
  for (const [i, hand] of sortedHands.entries()){
    sum += hand.bid * (i + 1);
  }
  return sum;
}

class Hand {
  constructor(rawHand, useJokers){
    const [cards, bid] = rawHand.trim().split(' ');
    this.cards = cards;
    this.bid = bid;
    this.handType = this.getHandType(useJokers);
  }

  getHandType(useJokers){
    const frequencies = new Map();
    this.cards.split('').forEach(card => frequencies.set(card, 1 + (frequencies.get(card) || 0)));

    let sortedFrequencies = [...frequencies.values()].sort((a, b) => b - a);

    if (useJokers){
      const jokerCount = frequencies.get('J') || 0;
      if (jokerCount < 5){
        //handle jokers: add number of jokers to the highest frequency of other cards, unless all cards in hand are jokers.
        frequencies.delete('J');
        sortedFrequencies = [...frequencies.values()].sort((a, b) => b - a);
        sortedFrequencies[0] += jokerCount;
      }
    }

    if (sortedFrequencies[0] === 5) return 6; //Five of a kind
    if (sortedFrequencies[0] === 4) return 5; //Four of a kind
    if (sortedFrequencies[0] === 3 && sortedFrequencies[1] === 2) return 4; //Full house
    if (sortedFrequencies[0] === 3) return 3; //Three of a kind
    if (sortedFrequencies[0] === 2 && sortedFrequencies[1] === 2) return 2; //Two pair
    if (sortedFrequencies[0] === 2) return 1; //One pair

    return 0;
  }

  compareTo(otherHand, cardOrder){
    if (this.handType === otherHand.handType){ //Compare high cards
      for (let i = 0; i < this.cards.length; i++){
        const myStrength = cardOrder.indexOf(this.cards[i]);
        const otherStrength = cardOrder.indexOf(otherHand.cards[i]);
        if (myStrength !== otherStrength) return myStrength - otherStrength;
      }
    }
    return this.handType - otherHand.handType;
  }
}

export { part1, part2 };
