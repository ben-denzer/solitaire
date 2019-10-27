import React from 'react';
import { AppWrapper } from './App.style';
import GameBoard from 'components/GameBoard';

interface Props {}

function App(props: Props): JSX.Element {
  return (
    <AppWrapper className="App">
      <h1>Solitaire</h1>
      <GameBoard />
    </AppWrapper>
  );
}

export default App;
