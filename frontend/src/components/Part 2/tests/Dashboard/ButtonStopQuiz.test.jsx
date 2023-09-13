import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonStopQuiz from '../../../Part 3/ButtonStopQuiz';

it('Test button start quiz', () => {
  render(<ButtonStopQuiz />, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Stop Quiz/i })).toBeInTheDocument();
});
