import React, { useState, useEffect, useRef } from 'react';
import '../styles/Game.css';
import Road from './Road';
import Car from './Car';
import Obstacle from './Obstacle';
import Coins from './Coins'; 
import UI from './UI';

const Game = () => {
  const [playerX, setPlayerX] = useState(175);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0); 
  const [gameOver, setGameOver] = useState(false);
  const [roadPos, setRoadPos] = useState(0);
  const [enemies, setEnemies] = useState([]);
  const [gameCoins, setGameCoins] = useState([]); 
  
  const requestRef = useRef();

  // --- RESTORED MOVEMENT LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      
      // Moving by 25px for smooth but fast response
      if (e.key === 'ArrowLeft') {
        setPlayerX((prev) => Math.max(10, prev - 25)); 
      }
      if (e.key === 'ArrowRight') {
        setPlayerX((prev) => Math.min(340, prev + 25));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]); // Movement depends on game status

  const animate = () => {
    if (gameOver) return;

    setRoadPos(prev => prev + 10);
    setScore(prev => prev + 1);

    // --- ENEMY LOGIC ---
    setEnemies(prev => {
      let nextEnemies = prev.map(en => ({ ...en, top: en.top + 8 }));
      if (Math.random() < 0.02) {
        nextEnemies.push({ id: Date.now(), top: -100, left: Math.random() * 340 });
      }
      nextEnemies = nextEnemies.filter(en => en.top < 900);
      
      nextEnemies.forEach(en => {
        // Precise Collision Detection
        if (en.top > window.innerHeight - 150 && en.top < window.innerHeight - 50) {
          if (Math.abs(en.left - playerX) < 45) {
            setGameOver(true);
          }
        }
      });
      return nextEnemies;
    });

    // --- COIN LOGIC ---
    setGameCoins(prev => {
      let nextCoins = prev.map(c => ({ ...c, top: c.top + 8 }));
      
      if (Math.random() < 0.015) {
        nextCoins.push({ id: Date.now(), top: -100, left: Math.random() * 340 });
      }

      const filteredCoins = nextCoins.filter(c => {
        const isCollected = (c.top > window.innerHeight - 150 && c.top < window.innerHeight - 50) && 
                            (Math.abs(c.left - playerX) < 40);
        
        if (isCollected) {
          setCoins(count => count + 1); 
          return false; 
        }
        return c.top < 900; 
      });

      return filteredCoins;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameOver, playerX]); // Re-run when player moves or crashes

  return (
    <div className="game-area">
      <UI score={score} coins={coins} gameOver={gameOver} />
      <Road roadPos={roadPos} />
      <Car x={playerX} />
      {enemies.map(en => <Obstacle key={en.id} top={en.top} left={en.left} />)}
      {gameCoins.map(c => <Coins key={c.id} top={c.top} left={c.left} />)}
    </div>
  );
};

export default Game;