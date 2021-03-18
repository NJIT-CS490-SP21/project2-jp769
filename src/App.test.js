import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const result = render(<App />);
  
  const loginButtonElement = screen.getByText('Enter Username');
  expect(loginButtonElement).toBeInTheDocument();
  
  fireEvent.click(loginButtonElement);
  expect(loginButtonElement).not.toBeInTheDocument();
});
