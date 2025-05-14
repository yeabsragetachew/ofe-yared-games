import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameSelection.css';

const games = [
  { id: 1, name: 'Bingo', category: 'brilliant', image: '/images/game1.png' },
  { id: 2, name: 'Memory Match', category: 'brilliant', image: '/images/game2.png' },
  { id: 3, name: 'Math Duel', category: 'brilliant', image: '/images/game3.png' },
  { id: 4, name: 'Bingo', category: 'brilliant', image: '/images/game1.png' },
  { id: 5, name: 'Memory Match', category: 'brilliant', image: '/images/game2.png' },
  { id: 6, name: 'Math Duel', category: 'brilliant', image: '/images/game3.png' },
  { id: 7, name: 'Lucky Spin', category: 'lucky', image: '/images/game4.png' },
  { id: 8, name: 'Coin Flip', category: 'lucky', image: '/images/game5.png' },
  { id: 9, name: 'Dice Roll', category: 'lucky', image: '/images/game6.png' },
  { id: 10, name: 'Lucky Spin', category: 'lucky', image: '/images/game4.png' },
  { id: 11, name: 'Coin Flip', category: 'lucky', image: '/images/game5.png' },
  { id: 12, name: 'Dice Roll', category: 'lucky', image: '/images/game6.png' },
];

const GameSelection = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Player';

  const handleGameClick = (gameName) => {
    navigate(`/${gameName.toLowerCase().replace(/\s+/g, '')}`);
  };

  return (
    <div className="game-selection-wrapper">
      <h2 className="greeting">👋 Hi {userName}, what do you want to play today?</h2>

      <h3 className="category-title brilliant-title">🎯 Are you brilliant?</h3>
      <div className="game-cards brilliant">
        {games.filter(game => game.category === 'brilliant').map(game => (
          <div key={game.id} className="game-card" onClick={() => handleGameClick(game.name)}>
            <img src={game.image} alt={game.name} className="game-image" />
            <p className="game-name">{game.name}</p>
          </div>
        ))}
      </div>

      <h3 className="category-title lucky-title">🍀 Or lucky?</h3>
      <div className="game-cards lucky">
        {games.filter(game => game.category === 'lucky').map(game => (
          <div key={game.id} className="game-card" onClick={() => handleGameClick(game.name)}>
            <img src={game.image} alt={game.name} className="game-image" />
            <p className="game-name">{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
