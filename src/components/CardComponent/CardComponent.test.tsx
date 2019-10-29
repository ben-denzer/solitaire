import React from 'react';
import CardComponent from './CardComponent';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Card } from 'types/Card';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const mockCard: Card = {
  cardColor: 'BLACK',
  displayValue: 'K',
  face: 'DOWN',
  suit: 'SPADE',
  val: 13
};

it('should not show values when face down', () => {
  const card: Card = { ...mockCard, face: 'DOWN' };
  const { container } = render(
    <DndProvider backend={HTML5Backend}>
      <CardComponent card={card} />
    </DndProvider>
  );
  expect(container.getElementsByTagName('svg').length).toBe(0);
  expect(container.getElementsByClassName('topVal').length).toBe(0);
  expect(container.getElementsByClassName('bottomVal').length).toBe(0);
});

it('should show values when face up', () => {
  const card: Card = { ...mockCard, face: 'UP' };
  const { container } = render(
    <DndProvider backend={HTML5Backend}>
      <CardComponent card={card} />
    </DndProvider>
  );
  expect(container.getElementsByTagName('svg').length).toBe(3);
  expect(container.getElementsByClassName('topVal')[0].textContent).toBe(card.displayValue);
  expect(container.getElementsByClassName('bottomVal')[0].textContent).toBe(card.displayValue);
});
