import React from 'react';
import FoundationPile from './FoundationPile';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
  const { container } = render(<FoundationPile />);
  expect(container).toBeInTheDocument();
});
