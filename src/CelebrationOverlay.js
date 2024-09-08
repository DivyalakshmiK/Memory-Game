import React, { useState, useEffect } from 'react';

const CelebrationOverlay = ({ moves, onRestart, visible }) => {
  const [characterMessage, setCharacterMessage] = useState('');

  useEffect(() => {
    setCharacterMessage(getCharacterMessage(moves));
  }, [moves]);

  const getCharacterMessage = (moves) => {
    if (moves <= 15) return "Sugoi! You're amazing!";
    if (moves <= 20) return "Yatta! Great job!";
    if (moves <= 25) return "Ganbare! You did well!";
    return "Otsukare! Nice effort!";
  };

  return (
    <div className={`celebration-overlay ${visible ? 'visible' : ''}`}>
      <div className="celebration-character">
        <div className="speech-bubble">{characterMessage}</div>
      </div>
      <div className="celebration-content">
        <h2 className="celebration-title">🎉 Congratulations! 🎉</h2>
        <p className="celebration-stats">You completed the game in {moves} moves!</p>
        <button className="restart-button" onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
};

export default CelebrationOverlay;