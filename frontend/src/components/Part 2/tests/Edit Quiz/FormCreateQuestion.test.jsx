import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FormCreateQuestion from '../../Edit Quiz/FormCreateQuestion';

it('Test default form create question', () => {
  render(<FormCreateQuestion />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Question:/i)).toBeInTheDocument();
  expect(screen.getByText(/Has Multiple Answers/i)).toBeInTheDocument();
  expect(screen.getByText(/Duration:/i)).toBeInTheDocument();
  expect(screen.getByText(/Points:/i)).toBeInTheDocument();
  expect(screen.getByText(/Url:/i)).toBeInTheDocument();
});
