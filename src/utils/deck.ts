import { Card, Suit, CardColor, CardDisplayValue } from 'types/Card';
import { Board } from 'types/Board';

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

function shuffleAndDeal(): Board {
  let deck: Card[] = shuffleDeck(createDeck());

  // 7 columns
  const tableau: Card[][] = [[], [], [], [], [], [], []];

  // go 7 rows deep
  for (let i = 0; i < 7; i++) {
    // go 7 columns across
    for (let j = 0; j < 7; j++) {
      // the first column has one card, 2nd col has 2 cards, etc
      if (j < i) {
        continue;
      }

      // take the top card from the deck
      const card: Card = deck[0];
      deck = deck.slice(1);

      // set the 1st card face up each time through the loop
      if (j === i) {
        card.face = 'UP';
      }

      tableau[j].unshift(card);
    }
  }

  const tempBoard: Board = {
    stock: deck,
    waste: [],
    foundations: [
      { suit: null, pile: [] },
      { suit: null, pile: [] },
      { suit: null, pile: [] },
      { suit: null, pile: [] }
    ],
    tableau,
    history: []
  };

  tempBoard.history = [{ ...tempBoard }];

  return tempBoard;
}

export { createDeck, shuffleDeck, shuffleAndDeal };
