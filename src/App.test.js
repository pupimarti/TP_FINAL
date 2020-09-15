import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render footer', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Para publicar tu comercio haz click aquí./i);
  expect(linkElement).toBeInTheDocument();
});
