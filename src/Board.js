import './Board.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

// const socket = require('./App');
// import socket from './App';

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calcTie(squares) {
  for (let i = 0; i < squares.length; i += 1) {
    if (squares[i] === null) {
      return false;
    }
  }
  return true;
}

function Board(props) {
  Board.propTypes = {
    s: PropTypes.instanceOf(Object).isRequired,
    name: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,
    playable: PropTypes.bool.isRequired,
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const {
    s, name, sign, playable,
  } = props;
  const winner = calcWinner(board, name);
  const [isNext, setNext] = useState('X');
  const tie = calcTie(board);
  // console.log('b', name, sign, playable, props, tie, '/b');
  function onClickButton(index) {
    const newBoard = board;

    if (
      board[index] === null
      && isNext === sign
      && !winner
      && playable
    ) {
      newBoard[index] = sign;
      setBoard(() => newBoard);

      let next = isNext;
      if (next === 'X') {
        next = 'O';
      } else {
        next = 'X';
      }
      setNext(() => next);

      s.emit('board', { board: newBoard, nextP: next });
    }
  }

  function onClickReset() {
    if (playable === true) {
      const newBoard = Array(9).fill(null);
      setBoard(() => newBoard);
      const next = 'X';
      setNext(() => next);
      if (winner && winner === sign) {
        s.emit('game_over', { winner: name });
      }
      s.emit('board', { board: newBoard, nextP: next });
    }
  }

  useEffect(() => {
    // Listening for a board event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    s.on('board', (data) => {
      // console.log('Player event received!');
      //   console.log(data);
      setBoard(() => data.board);
      setNext(() => data.nextP);
    });
  }, []);

  const Squares = board.map((box, index) => (
    <Box value={box} key={index} onClick={() => onClickButton(index)} />
  ));

  return (
    <div>
      {winner ? (
        <div>
          <p>
            Winner:
            {winner}
          </p>
          {' '}
          <button onClick={() => onClickReset()} type="button">Reset</button>
        </div>
      ) : (
        null
      )}
      {tie ? (
        <div>
          <p>It&apos;s a Tie!</p>
          {' '}
          <button onClick={() => onClickReset()} type="button">Reset</button>
        </div>
      ) : null}
      <div>
        <p>
          Next to play:
          {isNext}
        </p>
      </div>
      <div className="board">{Squares}</div>
    </div>
  );
}

export default Board;
