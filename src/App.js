import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Game from './Game';
// const Game = require('./Game');

const socket = io();

function App() {
  const inputRef = useRef(null); // for input
  const [playerName, setName] = useState(''); // display name
  const [loggedIn, setLogin] = useState(false); // check if logged in
  const [leaderboard, setLeaderboard] = useState({});

  function onClickButton() {
    const usernameText = inputRef.current.value;
    setName(() => usernameText);
    socket.emit('login', { player: usernameText });
    setLogin(() => true);
  }

  function getLeaderboard(data) {
    const copy = data.users;
    // console.log(copy);
    const copyU = leaderboard;
    Object.keys(copy).forEach((key) => { copyU[key] = copy[key]; });
    setLeaderboard(() => copyU);
    // console.log(leaderboard);
  }

  useEffect(() => {
    socket.on('user_list', (data) => {
      // console.log('User list event received!', data.users);
      getLeaderboard(data);
      // console.log(leaderboard);
    });
    socket.on('user_list', (data) => {
      // console.log('User list event received!', data.users);
      getLeaderboard(data);
      // console.log(leaderboard);
    });
  }, []);

  return loggedIn === false ? (
    <div>
      <h2>Login to continue</h2>
      <input ref={inputRef} type="text" minLength="1" />
      <button onClick={() => onClickButton()} type="submit">Enter Username</button>
    </div>
  ) : (
    <div>
      <Game s={socket} name={playerName} arr={leaderboard} />
    </div>
  );
}

export default App;
