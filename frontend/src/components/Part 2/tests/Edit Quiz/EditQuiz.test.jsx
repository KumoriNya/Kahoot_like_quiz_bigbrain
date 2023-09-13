import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditQuiz from '../../Edit Quiz/EditQuiz';

it('Test default Edit Quiz', () => {
  render(<EditQuiz />, { wrapper: BrowserRouter });

  const ButtonCancelEdit = screen.getByRole('button', { name: /Cancel Edit/i })
  expect(ButtonCancelEdit).toBeInTheDocument();

  const ButtonAddQuestion = screen.getByRole('button', { name: /Add Question/i })
  expect(ButtonAddQuestion).toBeInTheDocument();

  expect(screen.getByText(/name:/i)).toBeInTheDocument();
  expect(screen.getByText(/thumbnail:/i)).toBeInTheDocument();

  const ButtonConfirmEditQuiz = screen.getByRole('button', { name: /Confirm Edit Quiz/i })
  expect(ButtonConfirmEditQuiz).toBeInTheDocument();
});
