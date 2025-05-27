import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { CardState } from '../types/cards';

interface CardDrawViewProps {
  cardState: CardState;
  onCardFlip: (index: number) => void;
  onCardsMerge: () => void;
  onDraw: () => void;
}

const CardDrawView: React.FC<CardDrawViewProps> = ({ 
  cardState, 
  onCardFlip, 
  onCardsMerge,
  onDraw
}) => {
  const [showMergeAnimation, setShowMergeAnimation] = useState(false);
  
  useEffect(() => {
    // 只有有卡片且全部翻开时才触发合并
    if (
      cardState.cards.length > 0 &&
      cardState.cards.every(card => card.isFlipped) &&
      !cardState.areMerged
    ) {
      const timer = setTimeout(() => {
        setShowMergeAnimation(true);
        setTimeout(() => {
          onCardsMerge();
          setShowMergeAnimation(false);
        }, 1000);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [cardState, onCardsMerge]);
  
  // If no cards are drawn yet, show the draw button
  if (cardState.cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-serif font-semibold text-primary-800 mb-3">今日觉察</h1>
          <p className="text-lg text-primary-600 mb-8">
            翻开两张牌，开始一天的觉察之旅
          </p>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDraw}
          className="px-8 py-4 bg-primary-500 text-white rounded-lg shadow-lg text-xl font-semibold transition-all hover:bg-primary-600"
        >
          抽取今日卡片
        </motion.button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-serif text-primary-700 mb-8">点击卡片翻转</h2>
      
      <div className="flex flex-row justify-center items-center gap-8">
        {cardState.cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              x: 0,
              opacity: 1,
              zIndex: 1
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.2
            }}
          >
            <Card
              card={card}
              onClick={() => !card.isFlipped && onCardFlip(index)}
            />
          </motion.div>
        ))}
      </div>
      
      {cardState.cards.some(card => !card.isFlipped) && (
        <p className="mt-6 text-center text-primary-600">
          {cardState.cards.filter(card => card.isFlipped).length === 1 
            ? "再翻开一张卡片" 
            : "点击翻开卡片"}
        </p>
      )}
    </div>
  );
};

export default CardDrawView;