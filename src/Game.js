import './App.css';
import { Board } from './Board.js';
import React, { useState, useEffect } from 'react';
import { socket } from './App.js';

export function Game(props){
  // let [player, setPlayer] = useState("");
  let [sign, setSign] = useState(null);
  let [Players, setPlayers] = useState([]); // Current Players 
  let [Spectators, setSpectators] = useState([]); // Spectators
  let [info, setInfo] = useState("");
  
  useEffect(() => {
    socket.on('login', (users) => {
      console.log("recieved login", users);
      console.log(Players, Spectators);
      update(users);
      console.log(Players, Spectators);
    });
  }, []);
  
  function update(users){
    console.log('here', users);
    const copy = users.players;
    let copyPlayers = Players;
    copy.map((x, index) => {copyPlayers[index] = x});
    setPlayers(() => {
      return copyPlayers;
    });
    const specs = users.spectators;
    setSpectators(() =>{
      let copyS = Spectators;
      specs.map((x, index) => {copyS[index] = x});
      return copyS;
    });
    let pX = users.PlayerX;
    let pY = users.PlayerY;
    if(props.name === pX){
      setSign(() => "X");
    }else if(props.name === pY){
      setSign(() => "O");
    }
    setInfo(() => <p>Spectators: {Spectators.toString()}<br/>Players: {Players.toString()}</p>);
  }
  
  return(
    <div>
      {info}
      <Board name={props.name} sign={sign} />
    </div>
  );
}