import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailedQuizInfo from '../../Dashboard/DetailedQuizInfo';

it('Test detailed quiz', () => {
  const quiz = {
    quiz: {
      id: 1
    }
  }

  render(<DetailedQuizInfo quiz={quiz}/>, { wrapper: BrowserRouter });

  expect(screen.getByText(/Title:/i)).toBeInTheDocument();
  expect(screen.getByText(/Number of questions:/i)).toBeInTheDocument();
  expect(screen.getByText(/Thumbnail:/i)).toBeInTheDocument();
  expect(screen.getByText(/Duration:/i)).toBeInTheDocument();
  expect(screen.getByText(/Active:/i)).toBeInTheDocument();
});
