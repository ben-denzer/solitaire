import React from 'react';
import { TableauPileWrapper } from './TableauPile.style';
import { Card, CardDragItem } from 'types/Card';
import CardComponent from 'components/CardComponent';
import { useDrop, DropTargetMonitor } from 'react-dnd';

interface Props {
  dropCardIntoTableau: (cardDragObj: CardDragItem, tableauIndex: number) => void;
  pile: Card[];
  tableauIndex: number;
}

function TableauPile(props: Props): JSX.Element {
  const { dropCardIntoTableau, pile, tableauIndex } = props;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'CARD',
    canDrop: (obj: CardDragItem) => {
      // if there is no pile, than only a king can be dropped
      if (!pile.length) {
        return obj.value === 13;
      }

      // find the bottom card of the pile
      const { cardColor, val } = pile[0];

      // the dropped card must be the opposite color and the value will be val - 1
      if (obj.cardColor === cardColor) {
        return false;
      }
      if (obj.value !== val - 1) {
        return false;
      }

      // you can drop if we haven't returned early
      return true;
    },
    drop: (card: CardDragItem) => {
      dropCardIntoTableau(card, tableauIndex);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  const reversedPile = [...pile].reverse();

  const cardStack: JSX.Element[] = reversedPile.map((card: Card, index: number) => {
    let isHighestFaceUpCardInTableau = false;
    if (index > 0 && card.face === 'UP' && reversedPile[index - 1].face === 'DOWN') {
      isHighestFaceUpCardInTableau = true;
    }

    // highlight the bottom card when drop is possible
    if (isOver && canDrop && index === pile.length - 1) {
      return (
        <CardComponent
          key={card.val + card.suit}
          card={card}
          inTableauPile={true}
          highlightForDrop={true}
          isHighestFaceUpCardInTableau={isHighestFaceUpCardInTableau}
        />
      );
    }

    return (
      <CardComponent
        key={card.val + card.suit}
        card={card}
        inTableauPile={true}
        isHighestFaceUpCardInTableau={isHighestFaceUpCardInTableau}
      />
    );
  });

  return (
    <TableauPileWrapper
      className="TableauPile"
      empty={pile.length === 0}
      ref={drop}
      highlightForDrop={!pile.length && isOver && canDrop}
    >
      {cardStack}
    </TableauPileWrapper>
  );
}

export default TableauPile;
