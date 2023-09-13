import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateGameForm from '../../Dashboard/FormCreateGame';

it('Test default create game form', () => {
  render(<CreateGameForm />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Name:/i)).toBeInTheDocument();

  const CreateNewGameButton = screen.getByRole('button', { name: /Create New Game/i })
  expect(CreateNewGameButton).toBeInTheDocument();
});
