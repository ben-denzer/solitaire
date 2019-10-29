import styled from 'styled-components';
import { cardHeight, cardWidth, cardBorderRadius, cardPileBorder } from 'styles/globalStyles';
import { gameBoardBgColor } from 'styles/colors';

export const GameBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: ${gameBoardBgColor};
  padding: 10px;

  .topRow {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .topRowLeft {
      display: flex;
      justify-content: flex-start;
    }

    .topRowRight {
      display: flex;
      justify-content: flex-end;
    }
  }

  .bottomSection {
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;
    min-height: ${cardHeight * 5}px;
  }
`;

interface CardPileProps {
  count: number;
  highlightDropZone?: boolean;
}

export const CardPile = styled.div<CardPileProps>`
  height: ${cardHeight}px;
  width: ${cardWidth}px;
  border: ${cardPileBorder};
  margin: 5px 8px;
  border-radius: ${cardBorderRadius}px;
  background-color: ${p => (p.highlightDropZone ? 'yellow' : 'none')};
`;
