import logo from './logo.svg';
import './App.css';
import { ListItem } from './ListItem.js';
import { Board } from './Board.js';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function App() {
  const [Players, setPlayers] = useState(Array(2).fill(null)); // Current Players 
  const [Spectators, setSpectators] = useState([]); // Spectators
  const inputRef = useRef(null); // for input 
  const [loggedIn, setLogin] = useState(false); // check if logged in
  const [playerName, setName] = useState(""); // display name
  const [playable, setPlay] = useState(false);
  const socket = io();
  
   useEffect(() => {
    socket.on('login', (users) => {
      console.log("recieved login");
      if(users.length <= 2){
        console.log("Players:");
        const copy = users;
        let copyPlayers = Players;
        copyPlayers[(users.length)-1] = copy[users.length - 1];
        // console.log(copyPlayers, copy);
        // setPlayers((newPlayers) => copyPlayers);
      }else{
        console.log("Spectators:");
        const specs = users.splice(2 + Spectators.length);
        const copySpecs = Spectators;
        copySpecs.push(specs[specs.length - 1]);
        // setSpectators((newSpecs) => copySpecs);
      }
      console.log(Players, Spectators);
    });
  }, []);
  
  function onClickButton(){
    const usernameText = inputRef.current.value;
    setLogin(() => true);
    setName(() => usernameText);
    socket.emit('login', {player: usernameText});
  }
  
  if (Players.indexOf(playerName) != -1){
    setPlay(() => true);
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
        <p> {playerName} </p>
        <Board playable={playable}/>
        </div>
      )
  );
}

export default App;