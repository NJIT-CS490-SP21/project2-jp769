import './Board.css';
import { Box } from './Box.js';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export function Board(props){
    let [board, setBoard] = useState(Array(9).fill(null));
    let [player, setPlayer] = useState("X");
    
    const socket = io(); // Connects to socket connection
    
    function onClickButton(index) {
        // console.log(index);
        let newBoard = board;
        
        if(board[index] === null){
            newBoard[index] = player;
            let newPlayer = player === "X" ? "O" : "X"; //create function instead
            setBoard(newBoard);
            setPlayer(newPlayer);
            // console.log(board, player);
            socket.emit('board', { board: newBoard, newPlayer: newPlayer });
        }
    }
    
    useEffect(() => {
    // Listening for a board event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
      console.log('Player event received!');
      console.log(data);
      
      setBoard((board) => data.board);
      setPlayer((newPlayer) => data.newPlayer);
      
    });
  }, []);
    
    let Squares = board.map((box, index) => <Box value={box} key={index} onClick={() => onClickButton(index)}/>)
    
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
        
        for (let i=0; i< lines.length; i++){
            const [a, b, c] = lines[i];
            
        }
    }
    return(
    <div className="board">
        {props.playable}
        {Squares}
    </div>);
}
