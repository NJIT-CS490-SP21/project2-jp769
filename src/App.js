import logo from './logo.svg';
import './App.css';
import { Game } from './Game.js';
import { useState, useRef } from 'react';
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