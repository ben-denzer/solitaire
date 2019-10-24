import React from 'react';
import CardComponent from './CardComponent';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
  const { getByText } = render(<CardComponent />);
  expect(getByText('CardComponent')).toBeInTheDocument();
});
