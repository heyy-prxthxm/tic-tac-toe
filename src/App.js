import React, { useState } from "react";
import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import "./App.css";

const App = () => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleBoxClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    // Step 2: Check if either player has won the game
    const gameWinner = checkWinner(updatedBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else if (gameWinner === "X") {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      } else {
        let { oScore } = scores;
        let { xScore } = scores;
        oScore += 0;
        xScore += 0;
        setScores({ ...scores, oScore });
        setScores({ ...scores, xScore });
      }
      setGameOver(true);
    }

    // Step 3: Change active player
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    if (!board.includes(null)) {
      return "draw";
    }
    return null;
  };

  const resetBoard = () => {
    setGameOver(false);
    setWinner(null);
    setBoard(Array(9).fill(null));
  };

  const handleNewGame = () => {
    window.location.reload();
  };

  let message = "";
  if (winner === "draw") {
    message = "Match Draw";
  } else if (winner) {
    message = `Winner: Player ${winner}`;
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <h1 className="title">TIC-TAC-TOE</h1>
        <div className="toggle-container">
          <label className="switch">
            <input type="checkbox" onClick={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
          <span className="mode-text">
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </span>
        </div>
        <ScoreBoard scores={scores} xPlaying={xPlaying} />
        <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
        {message && <div className="msg">{message}</div>}
        <div className="buttons-container">
          <ResetButton resetBoard={resetBoard} />
          <button className="new-game-button" onClick={handleNewGame}>New Game</button>
        </div>
      </div>
    </div>
  );
};

export default App;
