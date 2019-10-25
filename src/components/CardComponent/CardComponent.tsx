import React from 'react';
import { CardComponentWrapper } from './CardComponent.style';
import { Card, Suit } from 'types/Card';
import { ClubImg, DiamondImg, HeartImg, SpadeImg } from 'img/Suits';

interface Props {
  card: Card;
}

const suitsMap: Record<Suit, JSX.Element> = {
  CLUB: <ClubImg />,
  DIAMOND: <DiamondImg />,
  HEART: <HeartImg />,
  SPADE: <SpadeImg />
};

function CardComponent(props: Props) {
  const { card } = props;

  const SuitImg: JSX.Element = suitsMap[card.suit];

  return (
    <CardComponentWrapper className="CardComponent" face={card.face} suit={card.suit}>
      {card.face === 'UP' ? (
        <>
          <div className="topVal">
            <span>{card.value}</span>
            {SuitImg}
          </div>
          <div className="bottomVal">
            <span>{card.value}</span>
            {SuitImg}
          </div>
          <div className="mainSuitImg">{SuitImg}</div>
        </>
      ) : null}
    </CardComponentWrapper>
  );
}

export default CardComponent;
