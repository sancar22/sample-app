import { Provider } from 'react-redux'
import {render, screen} from '@testing-library/react';
import Login from './Login';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

let store;
describe('Login Screen', () => {

  test('should not render when modal sign in is false', () => {
    const history = createMemoryHistory()
    render(
        <Router location ={history.location} navigator ={history} >
            <Login />
        </Router>
    )
    let passwordShowing = screen.queryByPlaceholderText(/Password/);
    expect(passwordShowing).toBeTruthy();
    let usernameShowing = screen.queryByPlaceholderText(/Username/);
    expect(usernameShowing).toBeTruthy();
  })

})