import styled from 'styled-components';
import { cardHeight, cardWidth, cardPileBorder, cardBorderRadius } from 'styles/globalStyles';
import { cardHighlightColor } from 'styles/colors';

interface TableauPileWrapperProps {
  empty: boolean;
  highlightForDrop: boolean;
}

export const TableauPileWrapper = styled.div<TableauPileWrapperProps>`
  height: ${cardHeight}px;
  width: ${cardWidth}px;
  border: ${p => (p.empty ? cardPileBorder : 'none')};
  border-radius: ${p => (p.empty ? cardBorderRadius + 'px' : 0)};
  background-color: ${p => (p.highlightForDrop ? cardHighlightColor : 'none')};
`;
