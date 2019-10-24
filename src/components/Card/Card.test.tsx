import React from 'react';
import Card from './Card';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
  const { getByText } = render(<Card />);
  expect(getByText('Card')).toBeInTheDocument();
});
