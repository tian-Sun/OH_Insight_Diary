import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../types/cards';

interface JournalViewProps {
  type: 'morning' | 'evening';
  cards: CardData[];
  onSave: (note: string) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ type, cards, onSave }) => {
  const [note, setNote] = useState('');
  
  const getPrompt = () => {
    if (type === 'morning') {
      return '今日抽到的卡片让你联想到什么，你觉得哪个和你最有关联，选一个最强烈的感受来记录~';
    } else {
      return '今天的生活，和这组牌有什么关联吗？';
    }
  };
  
  const getTitle = () => {
    return type === 'morning' ? '晨间觉察' : '夜间复盘';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      onSave(note.trim());
    }
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-serif text-center text-primary-700 mb-6">
        {getTitle()}
      </h2>
      
      <div className="mb-6 flex justify-center">
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
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label htmlFor="journal-note" className="block text-sm font-medium text-gray-700 mb-2">
            {getPrompt()}
          </label>
          <textarea
            id="journal-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="journal-paper w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder="在这里记录你的想法..."
            required
          />
        </div>
        
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg shadow hover:bg-primary-600 transition-colors"
          >
            保存{type === 'morning' ? '晨间' : '夜间'}记录
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default JournalView;