import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonStopQuiz from '../ButtonStopQuiz';

it('Test button stop quiz', () => {
  const quiz = {
    quiz: {
      id: 1
    }
  }

  render(<ButtonStopQuiz quiz={quiz}/>, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Stop Quiz/i })).toBeInTheDocument();
});
