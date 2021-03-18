import './App.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import Leaderboard from './Leaderboard';

const socket = require('./App');

function Game(props) {
  Game.propTypes = {
    name: PropTypes.string.isRequired,
    arr: PropTypes.instanceof(Array).isRequired,
  };
  const { name, arr } = props;
  const [sign, setSign] = useState(null); // Player X or 0 Stored client side
  const [Players, setPlayers] = useState([]); // Current Players
  const [Spectators, setSpectators] = useState([]); // Spectators
  const [info, setInfo] = useState(''); // diaplay of players and spectators
  const [playable, setPlayable] = useState(false);
  const [showLeaderboard, setShown] = useState(false); // show leaderboard
  // const { socket } = props;
  console.log(name, arr, props);
  function update(users) {
    const copy = users.players;
    let copyPlayers;
    copy.map((x, index) => {
      copyPlayers = Players;
      copyPlayers[index] = x;
      return copyPlayers;
    });
    setPlayers(() => copyPlayers);
    const specs = users.spectators;
    setSpectators(() => {
      const copyS = Spectators;
      Object.keys(specs).forEach((keys) => { copyS[keys] = specs[keys]; });
      // specs.map((x, index) => (copyS[index] = x));
      return copyS;
    });
    const pX = users.PlayerX;
    const pY = users.PlayerY;
    if (name === pX) {
      setSign(() => 'X');
    } else if (name === pY) {
      setSign(() => 'O');
    }
    if (Players.includes(name) && Players.length > 1) {
      setPlayable(() => true);
    }
    setInfo(() => (
      <p>
        Spectators:
        {' '}
        {Spectators.toString()}
        <br />
        Players:
        {' '}
        {Players.toString()}
      </p>
    ));
  }

  useEffect(() => {
    socket.on('login', (users) => {
      console.log('recieved login', users);
      update(users);
      // console.log(Players, Spectators);
    });
  }, []);

  function onClickShowLeaderboard() {
    setShown((prevShown) => !prevShown);
  }

  return (
    <div>
      <p>
        Logged in as:
        {' '}
        {name}
        {' '}
        (You&apos;re
        {' '}
        {sign}
        )
      </p>
      <p>{info}</p>

      {Players.length === 1 ? (
        <p className="alert_message">Waiting for Player 2</p>
      ) : null}
      <Board name={name} sign={sign} playable={playable} />

      {showLeaderboard === true ? (
        <div>
          <button onClick={() => onClickShowLeaderboard()} type="button">
            Hide Leaderboard
          </button>
          <Leaderboard arr={arr} name={name} />
        </div>
      ) : (
        <div>
          <button onClick={() => onClickShowLeaderboard()} type="button">
            Show Leaderboard
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
