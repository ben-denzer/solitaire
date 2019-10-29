import { createDeck, shuffleDeck, shuffleAndDeal } from './deck';
import { Suit, Card } from 'types/Card';

describe('createDeck', () => {
  it('should have 4 suits with 13 cards each', () => {
    const deck: Card[] = createDeck();
    let cards: Record<Suit, number> = {
      CLUB: 0,
      DIAMOND: 0,
      SPADE: 0,
      HEART: 0
    };
    for (let card of deck) {
      cards[card.suit] = cards[card.suit] + 1;
    }
    expect(cards.CLUB).toBe(13);
    expect(cards.DIAMOND).toBe(13);
    expect(cards.SPADE).toBe(13);
    expect(cards.HEART).toBe(13);
  });
});

describe('shuffleDeck', () => {
  it('should shuffle the cards', () => {
    const deck: Card[] = createDeck();
    const shuffled: Card[] = shuffleDeck(deck);
    for (let i = 0; i < shuffled.length; i++) {
      if (shuffled[i].suit !== deck[i].suit || shuffled[i].value !== deck[i].value) {
        return;
      }
    }

    throw new Error('never found a card that was different');
  });

  it('should have 4 suits with 13 cards each', () => {
    const deck: Card[] = createDeck();
    const shuffled: Card[] = shuffleDeck(deck);
    let cards: Record<Suit, number> = {
      CLUB: 0,
      DIAMOND: 0,
      SPADE: 0,
      HEART: 0
    };
    for (let card of shuffled) {
      cards[card.suit] = cards[card.suit] + 1;
    }
    expect(cards.CLUB).toBe(13);
    expect(cards.DIAMOND).toBe(13);
    expect(cards.SPADE).toBe(13);
    expect(cards.HEART).toBe(13);
  });
});

describe('shuffleAndDeal', () => {
  it('should return 52 cards', () => {
    const board = shuffleAndDeal();
    let totalCount = board.stock.length;
    for (let tableau of board.tableau) {
      totalCount += tableau.length;
    }
    expect(totalCount).toBe(52);
  });

  it('should have the correct lengths in the tableau stacks - and one card should be face up', () => {
    const board = shuffleAndDeal();
    if (board.tableau.length !== 7) {
      throw new Error('wrong number of tableau stacks');
    }
    for (let i = 0; i < board.tableau.length; i++) {
      // stack 0 should have 1 card, stack 1 should have 2 cards, etc
      if (board.tableau[i].length !== i + 1) {
        throw new Error('wrong count in tableau stack');
      }

      // first card should be face up
      expect(board.tableau[i][0].face).toBe('UP');

      // check for any other face up cards
      const restOfStack = board.tableau[i].slice(1);
      const faceUpCards = restOfStack.find((c: Card) => c.face === 'UP');
      expect(faceUpCards).toBeUndefined();
    }
  });
});
