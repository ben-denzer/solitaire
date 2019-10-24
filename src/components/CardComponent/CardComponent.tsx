import React from 'react';
import { CardComponentWrapper } from './CardComponent.style';
import { Card } from 'types/Card';
import SpadeImg from 'img/Spade';

interface Props {
  card: Card;
}

function CardComponent(props: Props) {
  const { card } = props;
  return (
    <CardComponentWrapper face={card.face}>
      {card.face === 'UP' ? (
        <>
          <div className="topVal">
            <span>{card.value}</span>
            <SpadeImg />
          </div>
          <div className="bottomVal">
            <span>{card.value}</span>
            <SpadeImg />
          </div>
          <div className="mainSuitImg">
            <SpadeImg />
          </div>
        </>
      ) : null}
    </CardComponentWrapper>
  );
}

export default CardComponent;
