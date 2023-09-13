import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonStartQuiz from '../../../Part 3/ButtonStartQuiz';

it('Test button start quiz', () => {
  render(<ButtonStartQuiz />, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Start Quiz/i })).toBeInTheDocument();
});
