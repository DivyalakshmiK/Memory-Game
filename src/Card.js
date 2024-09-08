import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div className={`card ${card.flipped ? 'flipped' : ''}`} onClick={onClick}>
      {card.flipped || card.matched ? card.value : '❓'}
    </div>
  );
};

export default Card;
