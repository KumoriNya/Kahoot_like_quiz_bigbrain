import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonStartQuiz from '../ButtonStartQuiz';

it('Test button start quiz', () => {
  const quiz = {
    quiz: {
      id: 1
    }
  }

  render(<ButtonStartQuiz quiz={quiz}/>, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Start Quiz/i })).toBeInTheDocument();
});
