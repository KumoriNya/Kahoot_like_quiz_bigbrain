import React from 'react';
import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../../Dashboard/Dashboard';

describe('Test Dashboard Component', () => {
  const getById = queryByAttribute.bind(null, 'id');

  it('Create game', () => {
    render(<Dashboard />, { wrapper: BrowserRouter });
    const DashboardText = screen.getByText(/Dashboard! list games.../i)
    expect(DashboardText).toBeInTheDocument();
    // There should be no games

    const CreateGameButton = screen.getByRole('button', { name: /Create Game/i })
    fireEvent.click(CreateGameButton)

    const CreateNewGameButton = screen.getByRole('button', { name: /Create New Game/i })
    fireEvent.click(CreateNewGameButton)

    // expect(screen.getByText(/Number of questions: 0/i)).toBeInTheDocument();
  });

  
})
