import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const element = getByTestId('app');
  expect(element).toBeInTheDocument();
});
