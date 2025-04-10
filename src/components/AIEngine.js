// src/components/AIEngine.js

// src/components/AIEngine.js

const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  
  export function getSmartMove(board) {
    const best = minimax(board, 'O');
    return best.index;
  }
  
  function minimax(newBoard, player) {
    const availSpots = newBoard
      .map((val, i) => (val === null ? i : null))
      .filter(val => val !== null);
  
    const winner = checkWinner(newBoard);
    if (winner === 'X') return { score: -10 };
    if (winner === 'O') return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };
  
    const moves = [];
  
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      newBoard[availSpots[i]] = player;
  
      const result = minimax(newBoard, player === 'O' ? 'X' : 'O');
      move.score = result.score;
  
      newBoard[availSpots[i]] = null;
      moves.push(move);
    }
  
    let bestMove;
    if (player === 'O') {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    return moves[bestMove];
  }
  
  function checkWinner(board) {
    for (let combo of winCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  
  