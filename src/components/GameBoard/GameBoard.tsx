import React, { useState, useEffect } from 'react';
import { GameBoardWrapper, CardPile } from './GameBoard.style';
import { Card, CardDragItem } from 'types/Card';
import { shuffleAndDeal } from 'utils/deck';
import { Board, Foundation } from 'types/Board';
import CardComponent from 'components/CardComponent';
import FoundationPile from 'components/FoundationPile';

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

  useEffect(() => {
    setBoard(shuffleAndDeal());
  }, []);

  const dropCardIntoFoundation = (cardDragObj: CardDragItem, foundationIndex: number): void => {
    if (!board) {
      return;
    }

    let nextBoard: Board = {
      ...board,
      history: [...board.history, board]
    };

    let cardToMove: Card | null = null;

    // check the waste first to see if the dropped card is from there
    if (board.waste.length) {
      const topWasteCard = board.waste[0];
      if (topWasteCard.val === cardDragObj.value && topWasteCard.suit === cardDragObj.suit) {
        cardToMove = topWasteCard;
        nextBoard.waste = nextBoard.waste.slice(1);
      }
    }

    // check the other foundations
    // this can only be someone moving an Ace from one foundation to the other
    if (cardDragObj.value === 1) {
      for (let i = 0; i < board.foundations.length; i++) {
        let { pile } = nextBoard.foundations[i];
        if (pile.length === 1 && pile[0].suit === cardDragObj.suit) {
          cardToMove = pile[0];
          nextBoard.foundations[i] = { suit: null, pile: [] };
        }
      }
    }

    if (cardToMove) {
      nextBoard.foundations[foundationIndex] = {
        suit: cardToMove.suit,
        pile: [cardToMove, ...nextBoard.foundations[foundationIndex].pile]
      };
    }
    setBoard(nextBoard);
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

  const foundations =
    board &&
    board.foundations.map((foundation: Foundation, index: number) => {
      return (
        <FoundationPile
          key={index}
          dropCardIntoFoundation={dropCardIntoFoundation}
          foundationIndex={index}
          suit={foundation.suit}
          pile={foundation.pile}
        />
      );
    });

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

        {/* FOUNDATIONS */}
        <div className="topRowRight">{foundations}</div>
      </div>
    </GameBoardWrapper>
  );
}

export default GameBoard;
