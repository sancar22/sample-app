import { fireEvent, render, RenderResult, screen, waitFor} from '@testing-library/react';
import {Router, Routes, Route} from 'react-router-dom';
import Login from '../screens/Login';
import { routes } from '../routes';
import { BrowserHistory, createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { testUser } from '../mocks/routes';

describe('tests for the login screen', () => {
  let component: RenderResult;
  let formElement: HTMLElement;
  let usernameInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;
  let linkButton: HTMLElement;
  let registerButton: HTMLElement;
  let history: BrowserHistory;
  
  beforeEach(() => {
    history = createBrowserHistory();
    component = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path={routes.HOME} element={<Login />}>
          </Route>
        </Routes>
      </Router>
    );
    formElement = screen.getByRole('login-form');
    usernameInput = screen.getByRole('username-login');
    passwordInput = screen.getByRole('password-login');
    loginButton = screen.getByRole('button-login');
    linkButton = screen.getByRole('register-link');
    registerButton = screen.getByRole('register-login');
  });

  afterEach(() => {
    history.push(routes.HOME);
    localStorage.clear();
    component.unmount();
  });

  test('form should contain expected elements', () => {
    expect(formElement).toContainElement(usernameInput);
    expect(formElement).toContainElement(passwordInput);
    expect(formElement).toContainElement(loginButton);
    expect(formElement).toContainElement(linkButton);
    expect(linkButton).toContainElement(registerButton);
  });

  
  test('form elements should have expected names and types', () => {
    expect(usernameInput).toHaveAttribute('placeholder', expect.stringMatching(/username/i));
    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(usernameInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('placeholder', expect.stringMatching(/password/i));
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
    expect(loginButton).toHaveTextContent(/login/i);
    expect(loginButton).toHaveAttribute('type', 'submit');
    expect(registerButton).toHaveTextContent(/register/i);
    
  });

  test('login logic should work as expected', async () => {
    userEvent.click(loginButton);
    await waitFor(() => expect(screen.getByText(/Missing fields!/i)).toBeInTheDocument());
    fireEvent.change(usernameInput, {target: {value: 'wrong_user'}});
    fireEvent.change(passwordInput, {target: {value: testUser.password}});
    userEvent.click(loginButton);
    await waitFor(() => expect(screen.getByText(/Invalid username or password!/i)).toBeInTheDocument());
    fireEvent.change(usernameInput, {target: {value: testUser.username}});
    fireEvent.change(passwordInput, {target: {value: 'wrong_pass'}});
    userEvent.click(loginButton);
    await waitFor(() => expect(screen.getByText(/Invalid username or password!/i)).toBeInTheDocument());
    fireEvent.change(usernameInput, {target: {value: testUser.username}});
    fireEvent.change(passwordInput, {target: {value: testUser.password}});
    userEvent.click(loginButton);
    await waitFor(() => expect(localStorage.getItem('jwt')).toBe(testUser.jwtToken));
    expect(history.location.pathname).toBe(routes.CHAT);
  });

  test('register button should redirect to register page', async () => {
    expect(history.location.pathname).toBe(routes.HOME);
    expect(linkButton).toHaveAttribute('href', routes.REGISTER);
    userEvent.click(linkButton);
    expect(history.location.pathname).toBe(routes.REGISTER);
  });

});
