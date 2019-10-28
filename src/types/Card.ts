export interface Card {
  cardColor: CardColor;
  displayValue: CardDisplayValue;
  face: CardFace;
  suit: Suit;
  val: number;
}

export type CardColor = 'BLACK' | 'RED';

export type CardDisplayValue = 'A' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type CardFace = 'DOWN' | 'UP';

export type Suit = 'SPADE' | 'DIAMOND' | 'HEART' | 'CLUB';
