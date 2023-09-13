import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../Dashboard/Dashboard';

it('Test default Dashboard', () => {
  render(<Dashboard />, { wrapper: BrowserRouter });
  const DashboardText = screen.getByText(/Dashboard! list games.../i)
  expect(DashboardText).toBeInTheDocument();

  const CreateGameButton = screen.getByRole('button', { name: /Create Game/i })
  expect(CreateGameButton).toBeInTheDocument();
});
