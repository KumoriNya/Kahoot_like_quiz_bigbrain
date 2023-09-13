import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonCopyGameLink from '../ButtonCopyGameLink';

it('Test button copy game link', () => {
  const quiz = {
    quiz: {
      id: 1
    }
  }

  render(<ButtonCopyGameLink quiz={quiz}/>, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Copy game link/i })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /Go to advance the game/i })).toBeInTheDocument();
});
