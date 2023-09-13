import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayJoinedSession from '../PlayJoinedSession';

it('Test play joined session', () => {
  render(<PlayJoinedSession/>, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument();

  expect(screen.getByText(/Hey!/i)).toBeInTheDocument();
  expect(screen.getByText(/You are about to join game with session id:/i)).toBeInTheDocument();
  expect(screen.getByText(/Please enter your name:/i)).toBeInTheDocument();
});
