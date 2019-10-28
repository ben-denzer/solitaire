import React from 'react';
import { CardComponentWrapper } from './CardComponent.style';
import { Card, Suit, CardColor } from 'types/Card';
import { ClubImg, DiamondImg, HeartImg, SpadeImg } from 'img/Suits';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface Props {
  card: Card;
}

interface CardDragItem {
  type: 'CARD';
  cardColor: CardColor;
  value: number;
}

const suitsMap: Record<Suit, JSX.Element> = {
  CLUB: <ClubImg />,
  DIAMOND: <DiamondImg />,
  HEART: <HeartImg />,
  SPADE: <SpadeImg />
};

function CardComponent(props: Props) {
  const { card } = props;

  const dragItem: CardDragItem = {
    type: 'CARD',
    cardColor: card.cardColor,
    value: card.val
  };

  const [{ isDragging }, drag] = useDrag({
    item: dragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const SuitImg: JSX.Element = suitsMap[card.suit];

  return (
    <CardComponentWrapper className="CardComponent" face={card.face} suit={card.suit} ref={drag}>
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
