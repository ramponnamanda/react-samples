import { useState } from "react";

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({isXNext, squares, onPlay}) {

  const winner = calculateWinner(squares);
  let status = winner ? "Winner : " + winner : "Next Player : " + (isXNext ? "X" : "O");

  function handleClick(i) {
    if(squares[i] || winner)
      return;

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    onPlay(nextSquares);
  }


  const boardArray = [[0,1,2],[3,4,5],[6,7,8]];

  const boardComponent = boardArray.map(row => {
    return <div className="board-row">
      {
        row.map(i => {
          return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
        })
      }
    </div>
  });


  return (
    <>
      <div className="status">{status}</div>
      {
        boardComponent
      }
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const isXNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    if(move === currentMove) {
      return <li key={move}>{description}</li>
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
