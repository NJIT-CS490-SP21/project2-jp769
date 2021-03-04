// import logo from './logo.svg';
// import { ListItem } from './ListItem.js';
import './App.css';
import { Game } from './Game.js';
import React, { useState, useEffect, useRef } from 'react';

import io from 'socket.io-client';

export let socket = io();

function App() {
  let inputRef = useRef(null); // for input 
  let [playerName, setName] = useState(""); // display name
  const [loggedIn, setLogin] = useState(false); // check if logged in
  
  function onClickButton(){
    const usernameText = inputRef.current.value;
    setName(() => usernameText);
    socket.emit('login', {player: usernameText});
    setLogin(() => true);
  }

  return (
      loggedIn === false ? (
      <div>
      <h2>Login to continue</h2>
      <input ref={inputRef} type="text" />
      <button onClick={() => onClickButton()}>Enter Username</button>
      </div>
      ) : (
      <div>
      <p>Logged in as: {playerName}</p>
      <Game name={playerName} />
      </div>
      ) 
  );
}

export default App;

// something about storing local variables and not client or something, index or checking players for username everytime since playerName stays