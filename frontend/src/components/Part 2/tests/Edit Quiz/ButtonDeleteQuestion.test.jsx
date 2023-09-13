import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DeleteQuestionButton from '../../Edit Quiz/ButtonDeleteQuestion';

it('Test default button delete question', () => {
  render(<DeleteQuestionButton />, { wrapper: BrowserRouter });

  const ButtonDeleteQuestion = screen.getByRole('button', { name: /Delete Question/i })
  expect(ButtonDeleteQuestion).toBeInTheDocument();
});
