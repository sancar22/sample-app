import { fireEvent,  getByText,  render, RenderResult, screen, waitFor} from '@testing-library/react';
import {Router, Routes, Route} from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { routes } from '../routes';
import { BrowserHistory, createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const jwtToken = 'randomstring';

const server = setupServer(rest.post('http://localhost:5000/api/auth/login', (req, res, ctx) => {
  return res(ctx.json({error: false, res: jwtToken}));
}));

describe('tests for the login screen', () => {
  let component: RenderResult;
  let formElement: HTMLElement;
  let usernameInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;
  let linkButton: HTMLElement;
  let registerButton: HTMLElement;
  let history: BrowserHistory;

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  
  beforeEach(() => {
    history = createBrowserHistory();
    component = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path={routes.HOME} element={<Login />}>
          </Route>
          <Route path={routes.REGISTER} element={<Register />}>
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
    server.resetHandlers();
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
    expect(passwordInput).toHaveAttribute('placeholder', expect.stringMatching(/password/i));
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(loginButton).toHaveTextContent(/login/i);
    expect(loginButton).toHaveAttribute('type', 'submit');
    expect(registerButton).toHaveTextContent(/register/i);
    
  });

  test('register button should redirect to register page', async () => {
    expect(history.location.pathname).toBe(routes.HOME);
    expect(linkButton).toHaveAttribute('href', routes.REGISTER);
    userEvent.click(linkButton);
    expect(history.location.pathname).toBe(routes.REGISTER);
  });

});
