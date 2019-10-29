import React from 'react';
import { TableauPileWrapper } from './TableauPile.style';
import { Card } from 'types/Card';
import CardComponent from 'components/CardComponent';

interface Props {
  pile: Card[];
}

function TableauPile(props: Props): JSX.Element {
  const { pile } = props;

  const cardStack: JSX.Element[] = [...pile]
    .reverse()
    .map((card: Card) => <CardComponent key={card.val + card.suit} card={card} inTableauPile={true} />);

  return (
    <TableauPileWrapper className="TableauPile" empty={pile.length === 0}>
      {cardStack}
    </TableauPileWrapper>
  );
}

export default TableauPile;
