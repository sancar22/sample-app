import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders loging/register when the app is rendered', () => {
  render(<App />);
  const registerElement = screen.getByText('Register');
  expect(registerElement).toBeInTheDocument();
  const loginElement = screen.getByText('Login');
  expect(loginElement).toBeInTheDocument();
});
