
import React from 'react';

const UI = ({ score, coins, gameOver }) => (
  <>
    <div className="ui-panel">
      <div className="stat-item">🏆 Score: {score}</div>
      <div className="stat-item" style={{ borderColor: '#f1c40f', color: '#f1c40f' }}>
        💰 Coins: {coins}
      </div>
    </div>
    
    {gameOver && (
      <div className="game-over">
        <h1>CRASHED!</h1>
        <p>Total Coins Collected: {coins}</p>
        <p>Final Score: {score}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}
        >
          TRY AGAIN
        </button>
      </div>
    )}
  </>
);

export default UI;