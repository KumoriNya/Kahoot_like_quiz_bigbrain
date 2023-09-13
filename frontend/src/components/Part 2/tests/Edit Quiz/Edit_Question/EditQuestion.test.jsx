import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditQuestion from '../../../Edit Quiz/Edit_Question/EditQuestion';

it('Test default edit quesiton', () => {
  render(<EditQuestion />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Question:/i)).toBeInTheDocument();
  expect(screen.getByText(/Has Multiple Answers/i)).toBeInTheDocument();
  expect(screen.getByText(/Duration:/i)).toBeInTheDocument();
  expect(screen.getByText(/Points:/i)).toBeInTheDocument();
  expect(screen.getByText(/Url:/i)).toBeInTheDocument();
  expect(screen.getByText(/Answer Space 1:/i)).toBeInTheDocument();

  const CancelEditQuestionButton = screen.getByRole('button', { name: /Cancel Upload Question/i })
  expect(CancelEditQuestionButton).toBeInTheDocument();

  const ConfirmEditQuestionButton = screen.getByRole('button', { name: /Confirm Upload Question/i })
  expect(ConfirmEditQuestionButton).toBeInTheDocument();
});
