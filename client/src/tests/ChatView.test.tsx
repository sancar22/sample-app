import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { Router, Routes, Route } from 'react-router-dom';
import ChatView from '../screens/ChatView';
import { routes } from '../routes';
import { BrowserHistory, createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { testUser, mockMessages} from '../mocks/routes';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import moment from 'moment';

const componentGenerator = () => {
  const history = createBrowserHistory();
  return (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path={routes.CHAT} element={<ChatView />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
};

describe('tests for the register screen', () => {
  let component: RenderResult;
  let history: BrowserHistory;

  beforeEach(() => {
    history = createBrowserHistory();
    history.push(routes.CHAT);
  });

  afterEach(() => {
    history.push(routes.CHAT);
    localStorage.clear();
    component.unmount();
  });

  test('should get user and message info with jwt token on component mount', async () => {
    localStorage.setItem('jwt', testUser.jwtToken);
    component = render(componentGenerator());
    await waitFor(() => {
      expect(
        screen.getByText(`Logged in as: ${testUser.username}`)
      ).toBeInTheDocument();
      expect(screen.getAllByRole('message-bubble').length).toBe(3); // There are initially 3 messages in our msw;
    });
  });

  test('should display messages correctly', async () => {
    localStorage.setItem('jwt', testUser.jwtToken);
    component = render(componentGenerator());
    await waitFor(() => {
      expect(screen.getAllByRole('message-bubble').length).toBe(3);
    });
    for (let i = 0; i < mockMessages.length; i++) {
      const { text, createdAt } = mockMessages[i];
      expect(screen.getByText(text)).toBeInTheDocument();
      expect(screen.getByText(moment(createdAt).format('MMMM Do YYYY, h:mm:ss a'))).toBeInTheDocument();
    }
    expect(component.container.querySelectorAll('.right').length).toBe(2);
    expect(component.container.querySelectorAll('.left').length).toBe(1);
  });

  test('should post message correctly', async () => {
    localStorage.setItem('jwt', testUser.jwtToken);
    component = render(componentGenerator());
    await waitFor(() => {
      expect(screen.getAllByRole('message-bubble').length).toBe(3);
    });
    const messageInput = screen.getByRole('message-input');
    const messageSubmit = screen.getByRole('message-submit');
    expect(messageSubmit).toHaveAttribute('disabled');
    fireEvent.change(messageInput, {target: {value: 'message here!'}});
    expect(messageSubmit).not.toHaveAttribute('disabled');
    userEvent.click(messageSubmit);
    await waitFor(() => {
      expect(screen.getAllByRole('message-bubble').length).toBe(4);
      expect(screen.getByText('message here!')).toBeInTheDocument();
      expect(component.container.querySelectorAll('.right').length).toBe(3);
      expect(component.container.querySelectorAll('.left').length).toBe(1);
    });
  });

  test('should not get user nor message info without jwt token', async () => {
    component = render(componentGenerator());
    await waitFor(() => {
      expect(screen.getByText(/Not authorized!/i)).toBeInTheDocument();
      expect(screen.queryByRole('message-bubble')).toBeNull();
    });
  });

  test('should logout', async () => {
    localStorage.setItem('jwt', testUser.jwtToken);
    component = render(componentGenerator());
    const logoutButton = screen.getByRole('logout-button');
    userEvent.click(logoutButton);
    expect(localStorage.getItem('jwt')).toBeNull();
  });
});
