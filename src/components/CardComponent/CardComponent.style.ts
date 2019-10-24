import styled from 'styled-components';
import { cardHeight, cardWidth, cardBorder } from 'styles/globalStyles';
import { cardFaceColor, cardBackColor } from 'styles/colors';
import { CardFace } from 'types/Card';

interface CardComponentStyleProps {
  face: CardFace;
}

export const CardComponentWrapper = styled.div<CardComponentStyleProps>`
  position: relative;
  height: ${cardHeight}px;
  width: ${cardWidth}px;
  border: ${cardBorder};
  background: ${p => (p.face === 'DOWN' ? cardBackColor : cardFaceColor)};
  display: flex;
  justify-content: center;
  align-items: center;

  .topVal,
  .bottomVal {
    position: absolute;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      height: 20px;
      width: auto;
    }
  }

  .topVal {
    top: 5px;
    left: 5px;
  }

  .bottomVal {
    bottom: 5px;
    right: 5px;
  }

  .mainSuitImg {
    svg {
      height: 40px;
      width: auto;
    }
  }
`;
