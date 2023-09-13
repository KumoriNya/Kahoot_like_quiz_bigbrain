import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ButtonEditQuestion from '../../../Edit Quiz/Edit_Question/ButtonEditQuestion';

it('Test default button edit question', () => {
  render(<ButtonEditQuestion />, { wrapper: BrowserRouter });

  const EditQuestionButton = screen.getByRole('button', { name: /Edit Question/i })
  expect(EditQuestionButton).toBeInTheDocument();
});
