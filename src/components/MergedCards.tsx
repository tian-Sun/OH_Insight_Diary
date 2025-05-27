import React from 'react';
import { CardData } from '../types/cards';

interface MergedCardsProps {
  cards: CardData[];
}

export function MergedCards({ cards }: MergedCardsProps) {
  return (
    <div
      className="journal-merged-cards"
      style={{ width: 240, height: 340, position: 'relative' }}
    >
      {/* 下方大文字卡（绝对定位） */}
      {cards.find(card => card.type === 'text') && (
        <div
          className="card-front"
          style={{
            width: 220,
            height: 300,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            backgroundImage: `url(/assets/cards/words/${cards.find(card => card.type === 'text')?.filename})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
      )}
      {/* 上方小图片卡（绝对定位） */}
      {cards.find(card => card.type === 'image') && (
        <div
          className="card-front"
          style={{
            width: 172,
            height: 235,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            backgroundImage: `url(/assets/cards/images/${cards.find(card => card.type === 'image')?.filename})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            opacity: 1
          }}
        />
      )}
    </div>
  );
} 