import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateGame from '../../Dashboard/CreateGame';

it('Test create game button', () => {
  render(<CreateGame />, { wrapper: BrowserRouter });
  const CreateGameButton = screen.getByRole('button', { name: /Create Game/i })
  expect(CreateGameButton).toBeInTheDocument();
});

it('Test cancel create game button is shown after clicking create game', () => {
  render(<CreateGame />, { wrapper: BrowserRouter });
  const CreateGameButton = screen.getByRole('button', { name: /Create Game/i })

  CreateGameButton.click()

  const CancelGameButton = screen.getByRole('button', { name: /Cancel Create Game/i })
  expect(CancelGameButton).toBeInTheDocument();
});
