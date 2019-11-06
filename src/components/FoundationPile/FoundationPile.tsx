import React from 'react';
import { Suit, Card, CardDragItem } from 'types/Card';
import CardComponent from 'components/CardComponent';
import { CardPile } from 'components/GameBoard/GameBoard.style';
import { useDrop, DropTargetMonitor } from 'react-dnd';

interface Props {
  key: number;
  dropCardIntoFoundation: (cardDragObj: CardDragItem, foundationIndex: number) => void;
  foundationIndex: number;
  pile: Card[];
  suit: Suit | null;
}

function FoundationPile(props: Props): JSX.Element {
  const { dropCardIntoFoundation, foundationIndex, pile, suit } = props;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'CARD',
    canDrop: (dragObj: CardDragItem): boolean => {
      // if there is already a suit chosen for this pile - make sure the dragObj is the correct suit
      if (suit && dragObj.suit !== suit) {
        return false;
      }

      // if it passed the early return above (it is the correct suit), than make sure that
      // the card value is correct - should be the pileValue + 1.
      let pileValue: number = pile.length ? pile[0].val : 0;
      return dragObj.value === pileValue + 1;
    },
    drop: (dragObj: CardDragItem) => {
      dropCardIntoFoundation(dragObj, foundationIndex);
    },
    collect: (monitor: DropTargetMonitor) => {
      return {
        canDrop: monitor.canDrop(),
        isOver: Boolean(monitor.isOver())
      };
    }
  });

  return (
    <CardPile count={pile.length} ref={drop} highlightDropZone={canDrop && isOver}>
      {/* Have a 2nd card underneath to show when dragging */}
      {pile.length > 1 && <CardComponent card={pile[1]} />}
      {Boolean(pile.length) && (
        <CardComponent card={pile[0]} coverTheCardBelow={true} highlightForDrop={canDrop && isOver} />
      )}
    </CardPile>
  );
}

export default FoundationPile;
