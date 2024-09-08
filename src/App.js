import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import CelebrationOverlay from './CelebrationOverlay';

const initialCards = [
  { id: 1, value: '🍎', flipped: false, matched: false },
  { id: 2, value: '🍌', flipped: false, matched: false },
  { id: 3, value: '🍇', flipped: false, matched: false },
  { id: 4, value: '🍒', flipped: false, matched: false },
  { id: 5, value: '🍉', flipped: false, matched: false },
  { id: 6, value: '🍍', flipped: false, matched: false },
  { id: 7, value: '🍎', flipped: false, matched: false },
  { id: 8, value: '🍌', flipped: false, matched: false },
  { id: 9, value: '🍇', flipped: false, matched: false },
  { id: 10, value: '🍒', flipped: false, matched: false },
  { id: 11, value: '🍉', flipped: false, matched: false },
  { id: 12, value: '🍍', flipped: false, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [disableBoard, setDisableBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Shuffle cards when the component mounts
  useEffect(() => {
    resetGame();
  }, []);

  // Shuffle function
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  

  const resetGame = () => {
    setShowCelebration(false);
    setTimeout(() => {
      const shuffledCards = shuffleArray(initialCards.map(card => ({ ...card })));
      setCards(shuffledCards);
      setFlippedCards([]);
      setMoves(0);
      setDisableBoard(false);
      setGameFinished(false);
    }, 500);
  };

  // Handle card click
  const handleCardClick = (index) => {
    if (disableBoard || cards[index].flipped || flippedCards.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);

    if (flippedCards.length === 0) {
      setFlippedCards([index]);
    } else if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0];
      const secondIndex = index;
      checkForMatch(firstIndex, secondIndex);
    }
  };

  // Check for match
  const checkForMatch = (firstIndex, secondIndex) => {
    if (cards[firstIndex].value === cards[secondIndex].value) {
      setTimeout(() => {
        const updatedCards = [...cards];
        updatedCards[firstIndex].matched = true;
        updatedCards[secondIndex].matched = true;
        setCards(updatedCards);
        resetFlippedCards();
        checkForGameCompletion(updatedCards);
      }, 1000);
    } else {
      setDisableBoard(true);
      setTimeout(() => {
        const updatedCards = [...cards];
        updatedCards[firstIndex].flipped = false;
        updatedCards[secondIndex].flipped = false;
        setCards(updatedCards);
        resetFlippedCards();
        setDisableBoard(false);
      }, 1000);
    }

    setMoves(moves + 1);
  };

  const checkForGameCompletion = (updatedCards) => {
    if (updatedCards.every(card => card.matched)) {
      setGameFinished(true);
      setTimeout(() => setShowCelebration(true), 500);
    }
  };

  // Reset flipped cards
  const resetFlippedCards = () => {
    setFlippedCards([]);
  };

  return (
    <div className="App">
      <div className={`game-container ${showCelebration ? 'hidden' : ''}`}>
        <h1>Memory Game</h1>
        <div className="scoreboard">
          <p>Moves: {moves}</p>
        </div>
        <div className="grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
      {gameFinished && (
        <CelebrationOverlay
          moves={moves}
          onRestart={resetGame}
          visible={showCelebration}
        />
      )}
    </div>
  );
}

export default App;