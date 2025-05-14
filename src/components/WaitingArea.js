import React, { useState } from 'react';
import '../styles/BingoGameRoom.css';

const BingoGameRoom = () => {
  const [board, setBoard] = useState(Array(25).fill(''));
  const [marked, setMarked] = useState(Array(25).fill(false));
  const [inputMode, setInputMode] = useState(true);
  const [litLetters, setLitLetters] = useState([]);
  const [showWinner, setShowWinner] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const winningCombos = [
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
  ];

  const checkCombos = (markedArr) => {
    return winningCombos.filter(combo => combo.every(index => markedArr[index]));
  };

  const handleInput = (index, value) => {
    const newBoard = [...board];
    newBoard[index] = value; // allow raw input for now
    setBoard(newBoard);
  };
  

  const toggleMark = (index) => {
    if (inputMode || board[index] === '') return;
    const newMarked = [...marked];
    newMarked[index] = !newMarked[index];
    setMarked(newMarked);
    updateLitLetters(newMarked);
  };

  const updateLitLetters = (markedArr) => {
    const completed = checkCombos(markedArr).length;
    const newLit = [];
    if (completed >= 1) newLit.push('B');
    if (completed >= 2) newLit.push('I');
    if (completed >= 3) newLit.push('N');
    if (completed >= 4) newLit.push('G');
    if (completed >= 5) newLit.push('O');
    setLitLetters(newLit);
    if (newLit.includes('O')) setShowWinner(true);
  };

  const getBingoLetters = () => {
    return ['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
      <div key={i} className={`bingo-letter ${litLetters.includes(letter) ? 'on' : ''}`}>{letter}</div>
    ));
  };

  const resetGame = () => {
    setBoard(Array(25).fill(''));
    setMarked(Array(25).fill(false));
    setInputMode(true);
    setLitLetters([]);
    setShowWinner(false);
  };

  const applyTemplate = (template) => {
    setBoard([...template]);
    setInputMode(false);
  };

  const saveCurrentToFavorites = () => {
    if (board.includes('') || new Set(board).size !== 25) return;
    const name = prompt("Name your template:");
    if (name) {
      setFavorites([...favorites, { name, template: [...board] }]);
    }
  };

  return (
    <div className="bingo-room-container">
      <h2 className="bingo-room-title">Single Player Bingo</h2>
      <p className="bingo-room-subtitle">Fill the board with numbers 1 to 25, no repeats, then start playing!</p>

      <div className="bingo-layout">
        <div className="bingo-board">
          <div className="bingo-header">{getBingoLetters()}</div>
          <div className="bingo-grid">
            {board.map((value, index) => (
              <div
                key={index}
                className={`bingo-cell ${marked[index] ? 'marked' : ''}`}
                onClick={() => toggleMark(index)}
              >
                {inputMode ? (
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={value}
                    onChange={(e) => handleInput(index, e.target.value)}
                    className="bingo-input"
                  />
                ) : (
                  value
                )}
              </div>
            ))}
          </div>
          {inputMode && (
            <>
              <button
                className="start-game-button"
                onClick={() => setInputMode(false)}
                disabled={
                  board.some(cell => isNaN(Number(cell)) || Number(cell) < 1 || Number(cell) > 25) ||
                  new Set(board.map(Number)).size !== 25
                }
                
              >
                Start Game
              </button>
              <button
                className="save-template-button"
                onClick={saveCurrentToFavorites}
                disabled={
                  board.some(cell => isNaN(Number(cell)) || Number(cell) < 1 || Number(cell) > 25) ||
                  new Set(board.map(Number)).size !== 25
                }
                
              >
                Save to Favorites
              </button>
            </>
          )}
        </div>

        <div className="template-sidebar">
          <h3>My Favorites</h3>
          {favorites.length === 0 && <p className="template-placeholder">No saved templates yet.</p>}
          {favorites.map((fav, i) => (
            <div
              key={i}
              className="template-mini-board"
              onClick={() => applyTemplate(fav.template)}
              title={fav.name}
            >
              {fav.template.map((num, j) => (
                <div key={j} className="mini-cell">{num}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {showWinner && (
        <div className="winner-announcement">
          <h1 className="winner-text">🎉 BINGO! YOU WIN! 🎉</h1>
          <button className="play-again-button" onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default BingoGameRoom;
