import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonDeleteQuiz from '../../Dashboard/ButtonDeleteQuiz';
import { BrowserRouter } from 'react-router-dom';

it('Test button delete', () => {
  render(<ButtonDeleteQuiz />, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
});
