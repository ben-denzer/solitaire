import React, { useEffect, useState } from 'react';
import { AppWrapper } from './App.style';
import { createDeck, shuffleDeck } from 'utils/deck';
import { Card } from 'types/Card';
import CardComponent from 'components/CardComponent';

interface Props {}

function App(props: Props): JSX.Element {
  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
  }, []);

  return (
    <AppWrapper className="AppWrapper">
      <h1>Solitaire</h1>
      {deck.length ? <CardComponent card={deck[0]} /> : null}
    </AppWrapper>
  );
}

export default App;
