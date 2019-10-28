import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { AppWrapper } from './App.style';
import GameBoard from 'components/GameBoard';

function App(): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppWrapper className="App">
        <h1>Solitaire</h1>
        <GameBoard />
      </AppWrapper>
    </DndProvider>
  );
}

export default App;
