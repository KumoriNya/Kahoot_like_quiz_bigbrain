import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameHandler from '../GameHandler';

it('Test game handler, no quiz active', () => {
  const quiz = {
    quiz: {
      id: 1,
      active: null
    }
  }

  render(<GameHandler quiz={quiz}/>, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Start Quiz/i })).toBeInTheDocument();
});
