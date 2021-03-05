import './Board.css';
import { Box, BoxSpec } from './Box.js';
import React, { useState, useEffect } from 'react';
import { socket } from './App.js';

function calcWinner(squares) {
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

function calcTie(squares){
    for (let i=0; i<squares.length; i++){
        if (squares[i] === null){
            return false;
        }
    }
    return true;
}

export function Board(props){
    const [board, setBoard] = useState(Array(9).fill(null));
    // const [player, setPlayer] = useState();
    const winner = calcWinner(board);
    const [isNext, setNext] = useState("X");
    const tie = calcTie(board);
    
    function onClickButton(index) {
        let newBoard = board;
        
        if(board[index] === null && isNext==props.sign && !winner && props.playable){
            newBoard[index] = props.sign;
            setBoard(() => newBoard);
            
            let next = isNext;
            isNext === "X" ? (next = "O") : (next = "X");
            setNext(() => next);
            
            socket.emit('board', {board: newBoard, nextP: next});
        }
    }
    
    function onClickReset(){
        if(props.playable === true){
            let newBoard = Array(9).fill(null);
            setBoard(() => newBoard);
        
            let next = "X";
            setNext(() => next);
            socket.emit('board', {board: newBoard, nextP: next});
        }
    }
    
    useEffect(() => {
    // Listening for a board event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
      console.log('Player event received!');
      console.log(data);
      setBoard((board) => data.board);
      setNext((isNext) => data.nextP);
    });
  }, []);
    
    let Squares;

    Squares = board.map((box, index) => <Box value={box} key={index} onClick={() => onClickButton(index)} />);
    
    return(
    <div>
    {winner ? <div><p>Winner: {winner} </p> <button onClick={() => onClickReset()}>Reset</button></div>
    : ( tie===true ? <div><p>TIE</p><button onClick={() => onClickReset()}>Reset</button></div> : <div><p>Next Player: {isNext}</p></div>)
    }
    <div className="board">
        {Squares}
    </div>
    
    </div>);
}
