import React from 'react';
import { GameBoardWrapper, CardPile } from './GameBoard.style';

interface Props {}

/*
  The official names for the different piles are:

  The Stock: The pile of facedown cards in the upper left corner.
  The Waste: The faceup pile next to the Stock in the upper left corner.
  The Foundations: The four piles in the upper right corner.
  The Tableau: The seven piles that make up the main table.
 */

function GameBoard(props: Props): JSX.Element {
  return (
    <GameBoardWrapper className="GameBoard">
      <div className="topRow">
        <div className="topRowLeft">
          <CardPile count={0} className="stock"></CardPile>
          <CardPile count={0} className="waste"></CardPile>
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
