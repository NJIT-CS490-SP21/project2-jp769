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

export function Board(props){
    const [board, setBoard] = useState(Array(9).fill(null));
    // const [player, setPlayer] = useState();
    const winner = calcWinner(board);
    const [isNext, setNext] = useState(false);
    
    function onClickButton(index) {
        // console.log(index);
        let newBoard = board;
        if(board[index] === null && isNext && !winner){
            newBoard[index] = props.sign;
            setBoard(() => newBoard);
            // console.log(board, player);
            setNext(() => false);
            socket.emit('board', {board: newBoard});
        }
    }
    
    useEffect(() => {
    // Listening for a board event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
      console.log('Player event received!');
      console.log(data);
      
      setBoard((board) => data.board);
      setNext(() => true);
    });
  }, []);
    
    let Squares;
    
    // if(!winner){
    Squares = board.map((box, index) => <Box value={box} key={index} onClick={() => onClickButton(index)} />);
    // }else{
    //     Squares = board.map((box, index) => <BoxSpec value={box} key={index} />);
    // }
    
    console.log("board", props, winner);
    
    return(
    <div>
    <div>{winner ? 'Winner: ' + winner : 'Next Player:'}</div>
    <div className="board">
        {Squares}
    </div>
    
    </div>);
}
