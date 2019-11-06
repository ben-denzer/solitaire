import React, { useState } from 'react';
import { CardComponentWrapper } from './CardComponent.style';
import { Card, Suit, CardDragItem } from 'types/Card';
import { ClubImg, DiamondImg, HeartImg, SpadeImg } from 'img/Suits';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface Props {
  card: Card;
  coverTheCardBelow?: boolean;
  highlightForDrop?: boolean;
  inTableauPile?: boolean;
}

const suitsMap: Record<Suit, JSX.Element> = {
  CLUB: <ClubImg />,
  DIAMOND: <DiamondImg />,
  HEART: <HeartImg />,
  SPADE: <SpadeImg />
};

function CardComponent(props: Props) {
  const { card, coverTheCardBelow, highlightForDrop, inTableauPile } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragItem: CardDragItem = {
    type: 'CARD',
    cardColor: card.cardColor,
    suit: card.suit,
    value: card.val
  };

  const [, drag] = useDrag({
    item: dragItem,
    collect: (monitor: DragSourceMonitor) => {
      setIsDragging(!!monitor.isDragging());
    }
  });

  const SuitImg: JSX.Element = suitsMap[card.suit];

  return (
    <CardComponentWrapper
      className="CardComponent"
      face={card.face}
      suit={card.suit}
      inTableauPile={inTableauPile}
      ref={card.face === 'UP' ? drag : null}
      isDragging={isDragging}
      coverTheCardBelow={coverTheCardBelow}
      highlightForDrop={highlightForDrop}
    >
      {card.face === 'UP' ? (
        <>
          <div className="topVal">
            <span>{card.displayValue}</span>
            {SuitImg}
          </div>
          <div className="bottomVal">
            <span>{card.displayValue}</span>
            {SuitImg}
          </div>
          <div className="mainSuitImg">{SuitImg}</div>
        </>
      ) : null}
    </CardComponentWrapper>
  );
}

export default CardComponent;
