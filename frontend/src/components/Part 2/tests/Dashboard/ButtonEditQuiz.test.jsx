import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonEditQuiz from '../../Dashboard/ButtonEditQuiz';
import { BrowserRouter } from 'react-router-dom';

it('Test button edit quiz', () => {
  render(<ButtonEditQuiz />, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
});
