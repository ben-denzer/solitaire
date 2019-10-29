import styled from 'styled-components';
import { cardHeight, cardWidth, cardPileBorder, cardBorderRadius } from 'styles/globalStyles';

interface TableauPileWrapperProps {
  empty: boolean;
}

export const TableauPileWrapper = styled.div<TableauPileWrapperProps>`
  height: ${cardHeight}px;
  width: ${cardWidth}px;
  border: ${p => (p.empty ? cardPileBorder : 'none')};
  border-radius: ${p => (p.empty ? cardBorderRadius + 'px' : 0)};
`;
