import React from 'react';
import FoundationPile from './FoundationPile';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

it('should render without crashing', () => {
  const { container } = render(
    <DndProvider backend={HTML5Backend}>
      <FoundationPile key={0} pile={[]} suit="SPADE" dropCardIntoFoundation={() => {}} foundationIndex={0} />
    </DndProvider>
  );
  expect(container).toBeInTheDocument();
});
