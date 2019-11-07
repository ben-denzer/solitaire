import React, { useState, useEffect } from 'react';
import { GameBoardWrapper, CardPile } from './GameBoard.style';
import { Card, CardDragItem } from 'types/Card';
import { shuffleAndDeal } from 'utils/deck';
import { Board, Foundation } from 'types/Board';
import CardComponent from 'components/CardComponent';
import FoundationPile from 'components/FoundationPile';
import TableauPile from 'components/TableauPile';
import updateFoundation from 'utils/updateFoundation';
import updateTableau from 'utils/updateTableau';

interface Props {}

/*
  The official names for the different piles are:

  The Stock: The pile of facedown cards in the upper left corner.
  The Waste: The faceup pile next to the Stock in the upper left corner.
  The Foundations: The four piles in the upper right corner.
  The Tableau: The seven piles that make up the main table.
 */

const checkWonGame = (foundations: Foundation[]): boolean => {
  for (let foundation of foundations) {
    if (foundation.pile.length < 13) {
      return false;
    }
  }
  return true;
};

function GameBoard(props: Props): JSX.Element {
  const [board, setBoard] = useState<Board | null>(null);
  const [wonGame, setWonGame] = useState<boolean>(false);

  useEffect(() => {
    setBoard(shuffleAndDeal());
  }, []);

  const dropCardIntoFoundation = (cardDragObj: CardDragItem, foundationIndex: number): void => {
    if (!board) {
      return;
    }
    const nextBoard = updateFoundation(board, cardDragObj, foundationIndex);
    setBoard(nextBoard);
    setWonGame(checkWonGame(nextBoard.foundations));
  };

  const dropCardIntoTableau = (cardDragObj: CardDragItem, tableauIndex: number) => {
    if (!board) {
      return;
    }
    const nextBoard = updateTableau(board, cardDragObj, tableauIndex);
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

  const tableauPiles =
    board &&
    board.tableau.length &&
    board.tableau.map(
      (pile: Card[], index: number): JSX.Element => {
        return <TableauPile key={index} tableauIndex={index} pile={pile} dropCardIntoTableau={dropCardIntoTableau} />;
      }
    );

  if (wonGame) {
    return <div>You Won!!</div>;
  }

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
            {/* have a 2nd card underneath to show when dragging */}
            {board && board.waste.length > 1 && <CardComponent card={board.waste[1]} coverTheCardBelow={true} />}
            {board && Boolean(board.waste.length) && <CardComponent card={board.waste[0]} coverTheCardBelow={true} />}
          </CardPile>
        </div>

        {/* FOUNDATIONS */}
        <div className="topRowRight">{foundations}</div>
      </div>

      <div className="bottomSection">
        {/* TABLEAU */}
        {tableauPiles}
      </div>
    </GameBoardWrapper>
  );
}

export default GameBoard;
