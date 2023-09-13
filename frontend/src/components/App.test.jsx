import React from 'react';
import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from '../Wrapper'

it('UI test defined in spec', () => {
  const getById = queryByAttribute.bind(null, 'id');
  const dom = render(<Wrapper />, { wrapper: BrowserRouter });

  // 1. Sign up
  const signUpLink = screen.getByRole('link', { name: 'Not yet a user? Sign up now' })

  fireEvent.click(signUpLink)

  // Enter account details
  const emailInput = getById(dom.container, 'email');
  fireEvent.change(emailInput, { target: { value: '222' } })

  const passwordInput = getById(dom.container, 'password');
  fireEvent.change(passwordInput, { target: { value: '1' } })

  const nameInput = getById(dom.container, 'name');
  fireEvent.change(nameInput, { target: { value: '6' } })

  // Register
  const confirmSignUp = screen.getByRole('button', { name: 'Register' })
  fireEvent.click(confirmSignUp)

  // expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
