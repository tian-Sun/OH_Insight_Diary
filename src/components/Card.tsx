import React from 'react';
import { CardData } from '../types/cards';

interface CardProps {
  card: CardData;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, onClick, className = '' }) => {
  // Mock image URLs for demo purposes
  // In a real implementation, these would be replaced with actual card images
  const getImageUrl = (filename: string, type: 'image' | 'text') => {
    if (type === 'image') {
      return `/assets/cards/images/${filename}`;
    } else {
      return `/assets/cards/words/${filename}`;
    }
  };

  const imageUrl = getImageUrl(card.filename, card.type);

  return (
    <div 
      className={`card ${card.isFlipped ? 'flipped' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div
          className="card-back flex items-center justify-center"
          style={{
            backgroundImage: `url(/assets/cards/backs/card-back.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="text-primary-700 font-serif text-xl rotate-45 opacity-30">
            OH Card
          </div>
        </div>
        <div 
          className="card-front"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* 不再渲染任何蒙层 */}
        </div>
      </div>
    </div>
  );
};

export default Card;