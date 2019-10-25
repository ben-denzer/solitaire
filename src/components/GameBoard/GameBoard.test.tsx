import React from 'react';
import GameBoard from './GameBoard';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
  const { container } = render(<GameBoard />);
  expect(container).toBeInTheDocument();
});
