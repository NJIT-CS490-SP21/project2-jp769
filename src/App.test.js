import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from './App';
import Game from './Game';

test('login flow', async () => {
  const result = render(<App />);
  
  const loginButtonElement = screen.getByText('Enter Username');
  expect(loginButtonElement).toBeInTheDocument();
  
  fireEvent.click(loginButtonElement);
  
  await waitFor(() => screen.getByText('Show Leaderboard'));
  expect(/Board/);
  expect(screen.getByText('Show Leaderboard'));
  expect(loginButtonElement).not.toBeInTheDocument();
  
})

test('show/hide leaderboard', async () => {
  const result = render(<App />);
  
  const loginButtonElement = screen.getByText('Enter Username');
  expect(loginButtonElement).toBeInTheDocument();
  
  fireEvent.click(loginButtonElement);
  
  await waitFor(() => screen.getByText('Show Leaderboard'));
  expect(screen.getByText('Show Leaderboard'));
  
  const leaderboardButtonElement = screen.getByText('Show Leaderboard');
  fireEvent.click(leaderboardButtonElement);
  expect(screen.getByText('Hide Leaderboard')).toBeInTheDocument();
  
})

test('prop change', async () => {
  const result = render(<Game />)
  expect(result).toHaveTextContent('Logged in as:')
  // const leaderboardButtonElement = screen.getByText('Show Leaderboard');
  // expect(screen.getByText('Show Leaderboard'));
  // fireEvent.click(leaderboardButtonElement);
  // expect(screen.getByText('Hide Leaderboard')).toBeInTheDocument();
})