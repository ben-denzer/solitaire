import { Card, Suit } from './Card';

export interface Foundation {
  suit: Suit | null;
  pile: Card[];
}

export interface Board {
  stock: Card[];
  waste: Card[];
  foundations: Foundation[];
  tableau: Card[][];
  history: Board[];
}
