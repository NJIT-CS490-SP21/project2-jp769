import './App.css';
import { Board } from './Board.js';
import { Leaderboard } from './Leaderboard.js';
import React, { useState, useEffect } from 'react';
import { socket } from './App.js';

export function Game(props){
  let [sign, setSign] = useState(null); // Player X or 0 Stored client side
  let [Players, setPlayers] = useState([]); // Current Players 
  let [Spectators, setSpectators] = useState([]); // Spectators
  let [info, setInfo] = useState(""); // diaplay of players and spectators
  let first = useState(true);
  let [playable, setPlayable] = useState(false);
  let [showLeaderboard, setShown] = useState(false); // show leaderboard
  
  useEffect(() => {

    socket.on('login', (users) => {
      console.log("recieved login", users);
      update(users);
      // console.log(Players, Spectators);
    });

  }, []);
  
  function update(users){
    const copy = users.players;
    let copyPlayers = Players;
    copy.map((x, index) => copyPlayers[index] = x);
    setPlayers(() => {
      return copyPlayers;
    });
    const specs = users.spectators;
    setSpectators(() =>{
      let copyS = Spectators;
      specs.map((x, index) => copyS[index] = x);
      return copyS;
    });
    let pX = users.PlayerX;
    let pY = users.PlayerY;
    if(props.name === pX){
      setSign(() => "X");
    }else if(props.name === pY){
      setSign(() => "O");
      first = false;
    }
    if(Players.includes(props.name) & pY){
      setPlayable(() => true);
    }
    setInfo(() => <p>Spectators: {Spectators.toString()}<br/>Players: {Players.toString()}</p>);
  }
  
  
  function onClickShowLeaderboard(){
    setShown((prevShown) => {
      return !prevShown;
    });
  }
  
  return(
    <div>
      <p>Logged in as: {props.name} (You're {sign})</p>
      <p>{info}</p>
      
      {Players.length === 1 ? <p className="alert_message">Waiting for Player 2</p> : null}
      <Board name={props.name} sign={sign} first={first} playable={playable}/>
      
        {showLeaderboard === true ? 
        (<div><button onClick={() => onClickShowLeaderboard()}>Hide Leaderboard</button>
        <Leaderboard arr={props.arr} name={props.name}/></div>)
        :
        (<div><button onClick={() => onClickShowLeaderboard()}>Show Leaderboard</button></div>)
        }
        
    </div>
  );
}