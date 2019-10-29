import React from 'react';
import GameBoard from './GameBoard';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

it('should render without crashing', () => {
  const { container } = render(
    <DndProvider backend={HTML5Backend}>
      <GameBoard />
    </DndProvider>
  );
  expect(container).toBeInTheDocument();
});
