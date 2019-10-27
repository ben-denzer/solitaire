import React, { useState, useEffect } from 'react';
import { GameBoardWrapper, CardPile } from './GameBoard.style';
import { Card } from 'types/Card';
import { shuffleDeck, createDeck } from 'utils/deck';
import { Board } from 'types/Board';
import CardComponent from 'components/CardComponent';

interface Props {}

/*
  The official names for the different piles are:

  The Stock: The pile of facedown cards in the upper left corner.
  The Waste: The faceup pile next to the Stock in the upper left corner.
  The Foundations: The four piles in the upper right corner.
  The Tableau: The seven piles that make up the main table.
 */

function GameBoard(props: Props): JSX.Element {
  const [board, setBoard] = useState<Board | null>(null);

  const deal = () => {
    const deck: Card[] = shuffleDeck(createDeck()).slice(0, 5);
    const tempBoard: Board = {
      stock: deck,
      waste: [],
      foundations: [
        { suit: null, pile: [] },
        { suit: null, pile: [] },
        { suit: null, pile: [] },
        { suit: null, pile: [] }
      ],
      tableau: [],
      history: []
    };
    setBoard(tempBoard);
  };

  const flipCardFromStock = (): void => {
    if (!board) {
      return;
    }
    if (board.stock.length === 0) {
      if (board.waste.length > 0) {
        const nextStock: Card[] = board.waste.reverse().map((card: Card) => ({ ...card, face: 'DOWN' }));
        const nextBoard = {
          ...board,
          history: [...board.history, board],
          stock: nextStock,
          waste: []
        };
        setBoard(nextBoard);
      }
      return;
    }

    const cardToFlip: Card = { ...board.stock[0], face: 'UP' };
    const nextBoard = {
      ...board,
      history: [...board.history, board],
      stock: board.stock.slice(1),
      waste: [cardToFlip, ...board.waste]
    };
    setBoard(nextBoard);
  };

  useEffect(() => {
    deal();
  }, []);

  return (
    <GameBoardWrapper className="GameBoard">
      <div className="topRow">
        <div className="topRowLeft">
          {/* STOCK */}
          <CardPile count={0} className="stock" onClick={flipCardFromStock}>
            {board && Boolean(board.stock.length) && <CardComponent card={board.stock[0]} />}
          </CardPile>

          {/* WASTE */}
          <CardPile count={0} className="waste">
            {board && Boolean(board.waste.length) && <CardComponent card={board.waste[0]} />}
          </CardPile>
        </div>
        <div className="topRowRight">
          <CardPile count={0} className="foundation"></CardPile>
          <CardPile count={0} className="foundation"></CardPile>
          <CardPile count={0} className="foundation"></CardPile>
          <CardPile count={0} className="foundation"></CardPile>
        </div>
      </div>
    </GameBoardWrapper>
  );
}

export default GameBoard;
