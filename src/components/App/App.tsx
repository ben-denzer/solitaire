import React from 'react';
import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5ToTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { AppWrapper } from './App.style';
import GameBoard from 'components/GameBoard';

function App(): JSX.Element {
  return (
    <DndProvider backend={MultiBackend} options={HTML5ToTouch}>
      <AppWrapper className="App">
        <h1>Solitaire</h1>
        <GameBoard />
      </AppWrapper>
    </DndProvider>
  );
}

export default App;
