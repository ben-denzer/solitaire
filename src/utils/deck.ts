import { Card, Suit, CardColor, CardDisplayValue } from 'types/Card';

function createDeck(): Card[] {
  const deck: Card[] = [];
  const suitArray: Suit[] = ['SPADE', 'HEART', 'DIAMOND', 'CLUB'];

  for (let suit of suitArray) {
    for (let i = 1; i <= 13; i++) {
      const valueMap: Record<string, CardDisplayValue> = {
        1: 'A',
        11: 'J',
        12: 'Q',
        13: 'K'
      };

      const displayValue: CardDisplayValue = valueMap[i.toString()] || i.toString();
      let cardColor: CardColor = 'BLACK';
      if (suit === 'DIAMOND' || suit === 'HEART') {
        cardColor = 'RED';
      }
      deck.push({ cardColor, displayValue, face: 'DOWN', suit, val: i });
    }
  }
  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  // fisher-yates shuffle stolen from https://bost.ocks.org/mike/shuffle/
  let tempDeck = [...deck];
  let cardCount = deck.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (cardCount) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * cardCount--);

    // And swap it with the current element.
    t = tempDeck[cardCount];
    tempDeck[cardCount] = tempDeck[i];
    tempDeck[i] = t;
  }

  return tempDeck;
}

export { createDeck, shuffleDeck };
