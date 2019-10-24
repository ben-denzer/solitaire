export interface Card {
  value: CardValue;
  suit: Suit;
}

export type Suit = 'SPADE' | 'DIAMOND' | 'HEART' | 'CLUB';

export type CardValue = 'A' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
