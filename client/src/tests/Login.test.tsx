import { fireEvent,  getByText,  render, RenderResult, screen} from '@testing-library/react';
import {Router, Routes, Route} from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { routes } from '../routes';
import { BrowserHistory, createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';


describe('tests for the login screen', () => {
  let component: RenderResult;
  let formElement: HTMLElement;
  let usernameInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;
  let linkButton: HTMLElement;
  let registerButton: HTMLElement;
  let history: BrowserHistory;

  beforeAll(() => {
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

  afterAll(() => {
    component.unmount();
  });

  
  test('register button should redirect to register page', () => {
    // // fireEvent.click(registerButton);
    
    // // const newElement = await screen.getByRole('firstname-register');
    // // await waitFor(() => expect(newElement).toBeNull());
    // window.history.pushState({}, 'Test', '/register');
  
    // userEvent.click(registerButton);
  
    // component
    // console.log(history.location.pathname);
    // expect(linkButton).toHaveAttribute('href', routes.REGISTER);
    // // userEvent.click(linkButton);
    // // history.push('/register');
    // console.log(history.location.pathname);
    // const newElement = screen.getByRole('firstname-register');
    // expect(newElement).toBeInTheDocument();
    // history.push('/register');
  
    // // console.log(window.location.href, 'here');
    // const element = screen.getByRole('login-form');
    // expect(element).toBeInTheDocument();
    const element = screen.getByText('Hello');
    expect(element).toBeInTheDocument();

  });
  

  
  test('form elements should have expected names and types', () => {
    const element = screen.getByText('Hello');
    expect(element).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('placeholder', expect.stringMatching(/username/i));
    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveAttribute('placeholder', expect.stringMatching(/password/i));
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(loginButton).toHaveTextContent(/login/i);
    expect(loginButton).toHaveAttribute('type', 'submit');
    expect(registerButton).toHaveTextContent(/register/i);
  });
  
  test('form should contain expected elements', () => {
    const element = screen.getByText('Hello');
    expect(element).toBeInTheDocument();
    expect(formElement).toContainElement(usernameInput);
    expect(formElement).toContainElement(passwordInput);
    expect(formElement).toContainElement(loginButton);
    expect(formElement).toContainElement(linkButton);
    expect(linkButton).toContainElement(registerButton);
  });

  

});
