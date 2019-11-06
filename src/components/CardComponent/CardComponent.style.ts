import styled from 'styled-components';
import { cardHeight, cardWidth, cardBorder, cardFontSize, cardBorderRadius } from 'styles/globalStyles';
import { cardFaceColor, cardBackColor, cardFontBlack, cardFontRed } from 'styles/colors';
import { CardFace, Suit } from 'types/Card';

interface CardComponentStyleProps {
  face: CardFace;
  suit: Suit;
  isDragging: boolean;
  inTableauPile?: boolean;
  coverTheCardBelow?: boolean;
}

const getFontColor = (suit: Suit): string => {
  if (suit === 'CLUB' || suit === 'SPADE') {
    return cardFontBlack;
  }
  return cardFontRed;
};

const getOpacity = (isDragging: boolean): string => (isDragging ? '.3' : '1');

export const CardComponentWrapper = styled.div<CardComponentStyleProps>`
  position: relative;
  height: ${cardHeight}px;
  width: ${cardWidth}px;
  border: ${cardBorder};
  background: ${p => (p.face === 'DOWN' ? cardBackColor : cardFaceColor)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${cardBorderRadius}px;
  color: ${p => getFontColor(p.suit)};
  user-select: none;
  margin-top: ${p => {
    if (p.inTableauPile) {
      return (cardHeight - 20) * -1 + 'px';
    }
    if (p.coverTheCardBelow) {
      return cardHeight * -1 + 'px';
    }
    return 0;
  }};

  :first-child {
    margin-top: 0;
  }

  .topVal,
  .bottomVal {
    position: absolute;
    font-size: ${cardFontSize}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: ${p => getOpacity(p.isDragging)};

    svg {
      height: ${cardHeight / 8}px;
      width: auto;
    }
  }

  .topVal {
    top: 0;
    left: 2px;
  }

  .bottomVal {
    bottom: 2px;
    right: 2px;
  }

  .mainSuitImg {
    opacity: ${p => getOpacity(p.isDragging)};

    svg {
      height: ${cardHeight / 3.5}px;
      width: auto;
      margin-top: ${cardHeight * 0.2};
    }
  }
`;
