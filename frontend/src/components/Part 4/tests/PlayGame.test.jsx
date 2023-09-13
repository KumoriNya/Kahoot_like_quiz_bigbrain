import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayGame from '../PlayGame';

it('Test play game', () => {
  render(<PlayGame/>, { wrapper: BrowserRouter });
  expect(screen.getByText(/The Game has not started./i)).toBeInTheDocument();
});
