// src/components/GameBoard.js
import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import { getSmartMove } from './AIEngine';
import ResultModal from './ResultModal';

const initialBoard = Array(9).fill(null);

const checkWinner = (board) => {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let [a, b, c] of winCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === 'X' ? 'You Win!' : 'AI Wins!';
    }
  }
  if (board.every(cell => cell !== null)) return 'Draw!';
  return null;
};

export default function GameBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [result, setResult] = useState(null);

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || result) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    const winner = checkWinner(newBoard);
    setBoard(newBoard);
    if (winner) {
      setResult(winner);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const getAIMove = (board) => {
    return getSmartMove(board);
  };

  useEffect(() => {
  if (!isPlayerTurn && !result) {
    const aiTimeout = setTimeout(() => {
      const aiMove = getAIMove(board);
      if (aiMove !== -1) {
        const newBoard = [...board];
        newBoard[aiMove] = 'O';
        const winner = checkWinner(newBoard);
        setBoard(newBoard);
        if (winner) {
          setResult(winner);
        } else {
          setIsPlayerTurn(true);
        }
      }
    }, 500);

    return () => clearTimeout(aiTimeout); // Cleanup timeout on unmount or re-run
  }
}, [isPlayerTurn, board, result]);

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setResult(null);
  };

  const renderCell = (index) => (
    <div className="cell" onClick={() => handleClick(index)} key={index}>
      {board[index]}
    </div>
  );

  return (
    <div className="game-container">
      <h1 style={{color: "red", fontWeight: " 800", marginTop: " 120px"}}>Tic-Tac-Toe-Game</h1>
      <div className="grid">
        {board.map((_, idx) => renderCell(idx))}
      </div>
      <ResultModal result={result} onRestart={resetGame} />
    </div>
  );
}
