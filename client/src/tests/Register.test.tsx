import { fireEvent, render, RenderResult, screen, waitFor} from '@testing-library/react';
import {Router, Routes, Route } from 'react-router-dom';
import Register from '../screens/Register';
import { routes } from '../routes';
import { BrowserHistory, createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { testUser } from '../mocks/routes';

describe('tests for the register screen', () => {
  let component: RenderResult;
  let formElement: HTMLElement;
  let firstNameInput: HTMLElement;
  let surnameInput: HTMLElement;
  let usernameInput: HTMLElement;
  let passwordInput: HTMLElement;
  let registerButton: HTMLElement;
  let linkButton: HTMLElement;
  let goBackButton: HTMLElement;
  let history: BrowserHistory;
  
  beforeEach(() => {
    history = createBrowserHistory();
    history.push(routes.REGISTER);
    component = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path={routes.REGISTER} element={<Register />}>
          </Route>
        </Routes>
      </Router>
    );
    formElement = screen.getByRole('register-form');
    firstNameInput = screen.getByRole('firstName-register');
    surnameInput = screen.getByRole('surname-register');
    usernameInput = screen.getByRole('username-register');
    passwordInput = screen.getByRole('password-register');
    registerButton = screen.getByRole('button-register');
    linkButton = screen.getByRole('login-link');
    goBackButton = screen.getByRole('go-back');
  });

  afterEach(() => {
    history.push(routes.REGISTER);
    localStorage.clear();
    component.unmount();
  });

  test('form should contain expected elements', () => {
    expect(formElement).toContainElement(firstNameInput);
    expect(formElement).toContainElement(surnameInput);
    expect(formElement).toContainElement(usernameInput);
    expect(formElement).toContainElement(passwordInput);
    expect(formElement).toContainElement(registerButton);
    expect(formElement).toContainElement(linkButton);
    expect(linkButton).toContainElement(goBackButton);
  });

  
  test('form elements should have expected names and types', () => {
    expect(firstNameInput).toHaveAttribute('placeholder', expect.stringMatching(/first name/i));
    expect(firstNameInput).toHaveAttribute('type', 'text');
    expect(firstNameInput).toHaveAttribute('required');
    expect(surnameInput).toHaveAttribute('placeholder', expect.stringMatching(/surname/i));
    expect(surnameInput).toHaveAttribute('type', 'text');
    expect(surnameInput).toHaveAttribute('required');
    expect(usernameInput).toHaveAttribute('placeholder', expect.stringMatching(/username/i));
    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(usernameInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('placeholder', expect.stringMatching(/password/i));
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
    expect(registerButton).toHaveTextContent(/register/i);
    expect(registerButton).toHaveAttribute('type', 'submit');
    expect(goBackButton).toHaveTextContent(/go back/i);
  });

  test('register logic should work as expected', async () => {
    userEvent.click(registerButton);
    await waitFor(() => expect(screen.getByText(/Missing fields!/i)).toBeInTheDocument());
    fireEvent.change(firstNameInput, {target: {value: testUser.firstName}});
    fireEvent.change(surnameInput, {target: {value: testUser.surname}});
    fireEvent.change(usernameInput, {target: {value: testUser.username}});
    fireEvent.change(passwordInput, {target: {value: 'short'}});
    userEvent.click(registerButton);
    await waitFor(() => expect(screen.getByText(/Password must be at least 6 characters long!/i)).toBeInTheDocument());
    fireEvent.change(passwordInput, {target: {value: 'longpassword'}});
    userEvent.click(registerButton);
    await waitFor(() => expect(screen.getByText(/Username already taken!/i)).toBeInTheDocument());
    fireEvent.change(usernameInput, {target: {value: 'notTakenUsername'}});
    userEvent.click(registerButton);
    await waitFor(() => expect(screen.getByText(/User registered successfully!/i)).toBeInTheDocument());
  });

  test('go back button should redirect to login page', async () => {
    expect(history.location.pathname).toBe(routes.REGISTER);
    expect(linkButton).toHaveAttribute('href', routes.HOME);
    userEvent.click(linkButton);
    expect(history.location.pathname).toBe(routes.HOME);
  });

});
