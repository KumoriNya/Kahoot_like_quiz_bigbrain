import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayJoin from '../PlayJoin';

it('Test play join', () => {
  render(<PlayJoin/>, { wrapper: BrowserRouter });
  expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument();

  expect(screen.getByText(/Hey!/i)).toBeInTheDocument();
  expect(screen.getByText(/Session id:/i)).toBeInTheDocument();
});
