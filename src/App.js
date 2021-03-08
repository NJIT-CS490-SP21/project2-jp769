import logo from './logo.svg';
import './App.css';
import { Game } from './Game.js';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

export let socket = io();

function App() {
  let inputRef = useRef(null); // for input 
  let [playerName, setName] = useState(""); // display name
  const [loggedIn, setLogin] = useState(false); // check if logged in
  let [leaderboard, setLeaderboard] = useState({});
  
  function onClickButton(){
    const usernameText = inputRef.current.value;
    setName(() => usernameText);
    socket.emit('login', {player: usernameText});
    setLogin(() => true);
  }
  useEffect(() => {
    socket.on('user_list', (data) => {
      console.log('User list event received!', data.users);
      get_leaderboard(data);
      console.log(leaderboard);
    });socket.on('user_list', (data) => {
      console.log('User list event received!', data.users);
      get_leaderboard(data);
      console.log(leaderboard);
    });
  }, []);
  
  function get_leaderboard(data){
    const copy = data.users;
    // console.log(copy);
    let copyU = leaderboard;
    for (let i in copy){
      copyU[i] = copy[i];
    }
    setLeaderboard(() => {return copyU});
    console.log(leaderboard);
  }

  return (
      loggedIn === false ? (
      <div>
      <h2>Login to continue</h2>
      <input ref={inputRef} type="text" minLength="1"/>
      <button onClick={() => onClickButton()}>Enter Username</button>
      </div>
      ) : (
      <div>
      <p>Logged in as: {playerName}</p>
      <Game name={playerName} arr={ leaderboard }/>
      </div>
      ) 
  );
}

export default App;