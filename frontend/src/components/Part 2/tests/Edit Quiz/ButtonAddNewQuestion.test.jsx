import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonAddNewQuestion from '../../Edit Quiz/ButtonAddNewQuestion';

it('Test default button add new question', () => {
  render(<ButtonAddNewQuestion />, { wrapper: BrowserRouter });

  const AddQuestionButton = screen.getByRole('button', { name: /Add Question/i })
  expect(AddQuestionButton).toBeInTheDocument();
});
