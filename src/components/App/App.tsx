import React, { useEffect } from 'react';
import { AppWrapper } from './App.style';
import { createDeck } from 'utils/deck';

interface Props {}

function App(props: Props) {
  useEffect(() => {
    createDeck();
  });

  return (
    <AppWrapper>
      <h1>Solitaire</h1>
    </AppWrapper>
  );
}

export default App;
