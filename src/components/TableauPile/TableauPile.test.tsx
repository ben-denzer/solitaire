import React from 'react';
import TableauPile from './TableauPile';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
  const { container } = render(<TableauPile />);
  expect(container).toBeInTheDocument();
});
