import React from 'react';
import { CardComponentWrapper } from './CardComponent.style';
import { Card, Suit, CardDragItem } from 'types/Card';
import { ClubImg, DiamondImg, HeartImg, SpadeImg } from 'img/Suits';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface Props {
  card: Card;
  inTableauPile?: boolean;
  onTopOfAnotherCard?: boolean;
}

const suitsMap: Record<Suit, JSX.Element> = {
  CLUB: <ClubImg />,
  DIAMOND: <DiamondImg />,
  HEART: <HeartImg />,
  SPADE: <SpadeImg />
};

function CardComponent(props: Props) {
  const { card, inTableauPile, onTopOfAnotherCard } = props;

  const dragItem: CardDragItem = {
    type: 'CARD',
    cardColor: card.cardColor,
    suit: card.suit,
    value: card.val
  };

  const [{ isDragging }, drag] = useDrag({
    item: dragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const SuitImg: JSX.Element = suitsMap[card.suit];

  if (isDragging) {
    return null;
  }

  return (
    <CardComponentWrapper
      className="CardComponent"
      face={card.face}
      suit={card.suit}
      inTableauPile={inTableauPile}
      onTopOfAnotherCard={onTopOfAnotherCard}
      ref={card.face === 'UP' ? drag : null}
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
