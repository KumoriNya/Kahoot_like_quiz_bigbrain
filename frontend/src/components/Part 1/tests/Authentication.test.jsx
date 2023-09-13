import React from 'react';
import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogOut from '../LogOut';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

describe('Test Authentication Component', () => {
  const getById = queryByAttribute.bind(null, 'id');

  it('Test logout button exists', () => {
    render(<LogOut />);
    expect(screen.getByRole('button', { name: /Log Out/i })).toBeInTheDocument();
  });

  it('Test Sign In', () => {
    render(<SignIn />, { wrapper: BrowserRouter });
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('Test alter sign in values', () => {
    const dom = render(<SignIn />, { wrapper: BrowserRouter });
    const emailInput = getById(dom.container, 'email');
    fireEvent.change(emailInput, { target: { value: '222' } })
    expect(emailInput).toHaveValue('222');

    const passwordInput = getById(dom.container, 'password');
    fireEvent.change(passwordInput, { target: { value: '1' } })
    expect(passwordInput).toHaveValue('1');
  });

  it('Test alter sign up values', () => {
    render(<SignUp />, { wrapper: BrowserRouter });
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  it('Test Sign up', () => {
    const dom = render(<SignUp />, { wrapper: BrowserRouter });
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();

    const emailInput = getById(dom.container, 'email');
    fireEvent.change(emailInput, { target: { value: '222' } })
    expect(emailInput).toHaveValue('222');

    const passwordInput = getById(dom.container, 'password');
    fireEvent.change(passwordInput, { target: { value: '1' } })
    expect(passwordInput).toHaveValue('1');

    const nameInput = getById(dom.container, 'name');
  fireEvent.change(nameInput, { target: { value: '6' } })
  expect(nameInput).toHaveValue('6');
  });
})
