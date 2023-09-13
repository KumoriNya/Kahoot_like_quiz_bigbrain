import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameAdvance from '../GameAdvance';

it('Test game advance', () => {
  render(<GameAdvance/>, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Start Next Question/i })).toBeInTheDocument();

  const AdvanceText = screen.getByText(/Advancing/i)
  expect(AdvanceText).toBeInTheDocument();
});
