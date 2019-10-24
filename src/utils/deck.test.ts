import { createDeck, shuffleDeck } from './deck';
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
