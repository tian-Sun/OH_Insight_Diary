import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Share2 } from 'lucide-react';
import { CardData } from '../types/cards';
import { JournalEntry } from '../types/journal';

interface MergedCardsViewProps {
  cards: CardData[];
  entry?: JournalEntry;
  canEditEvening: boolean;
  onEveningClick: () => void;
}

const MergedCardsView: React.FC<MergedCardsViewProps> = ({ 
  cards, 
  entry, 
  canEditEvening,
  onEveningClick
}) => {
  const handleShare = () => {
    // Implement share functionality
    alert('Share functionality would be implemented here');
    // In a real implementation, this would generate an image to share
  };

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        style={{ width: 240, height: 340, position: 'relative' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {(() => { console.log('MergedCardsView cards:', cards); return null })()}
        {cards.map((card, index) => {
          if (card.type === 'text') {
            const imageUrl = `/assets/cards/words/${card.filename}`;
            return (
              <div
                key={index}
                className="card-front rounded-lg shadow-lg border-2 border-white"
                style={{
                  width: 200,
                  height: 280,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            );
          }
          return null;
        })}
        {cards.map((card, index) => {
          if (card.type === 'image') {
            const imageUrl = `/assets/cards/images/${card.filename}`;
            return (
              <div
                key={index}
                className="card-front rounded-lg shadow-lg border-2 border-white"
                style={{
                  width: 200,
                  height: 280,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            );
          }
          return null;
        })}
      </motion.div>
      
      <motion.div 
        className="journal-entry w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-xl font-serif text-primary-700 border-b border-primary-200 pb-2 mb-4">
          晨间觉察
        </h2>
        <div className="journal-paper p-4 rounded min-h-24 mb-4">
          {entry.morningNote || <span className="text-gray-400">今天还没有记录晨间觉察...</span>}
        </div>
      </motion.div>
      
      <motion.div 
        className="journal-entry w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-xl font-serif text-primary-700 border-b border-primary-200 pb-2 mb-4 flex justify-between items-center">
          <span>夜间复盘</span>
          {!canEditEvening && !entry.eveningNote && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock size={16} className="mr-1" />
              <span>18:00 后开放</span>
            </div>
          )}
        </h2>
        
        {entry.eveningNote ? (
          <div className="journal-paper p-4 rounded min-h-24">
            {entry.eveningNote}
          </div>
        ) : canEditEvening ? (
          <button 
            onClick={onEveningClick}
            className="w-full py-4 bg-primary-100 text-primary-700 rounded-lg border border-primary-200 hover:bg-primary-200 transition-colors"
          >
            记录今日复盘
          </button>
        ) : (
          <div className="journal-paper p-4 rounded min-h-24 flex items-center justify-center">
            <span className="text-gray-400">请到真实世界里自由的体验生活</span>
          </div>
        )}
      </motion.div>
      
      {entry.eveningNote && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleShare}
          className="flex items-center px-6 py-3 bg-secondary-500 text-white rounded-lg shadow hover:bg-secondary-600 transition-colors"
        >
          <Share2 size={18} className="mr-2" />
          分享今日觉察
        </motion.button>
      )}
    </div>
  );
};

export default MergedCardsView;