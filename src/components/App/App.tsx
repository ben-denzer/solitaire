import React, { useEffect, useState } from 'react';
import { AppWrapper } from './App.style';
import { createDeck, shuffleDeck } from 'utils/deck';
import { Card } from 'types/Card';
import CardComponent from 'components/CardComponent';
import GameBoard from 'components/GameBoard';

interface Props {}

function App(props: Props): JSX.Element {
  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
  }, []);

  return (
    <AppWrapper className="App">
      <h1>Solitaire</h1>
      <GameBoard />
    </AppWrapper>
  );
}

export default App;
