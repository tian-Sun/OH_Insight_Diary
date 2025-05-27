import React, { useRef } from 'react';
import { CardData } from '../types/cards';
import { Clock, Share2 } from 'lucide-react';
import { MergedCards } from './MergedCards';
import html2canvas from 'html2canvas';

interface DayReviewViewProps {
  date: string;
  cards: CardData[];
  morningNote: string;
  eveningNote?: string;
  canEditEvening: boolean;
  onEveningClick: () => void;
}

export function DayReviewView({ date, cards, morningNote, eveningNote, canEditEvening, onEveningClick }: DayReviewViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  function handleShare() {
    if (!contentRef.current) return;
    html2canvas(contentRef.current, { backgroundColor: '#fdf6e3' }).then(canvas => {
      const link = document.createElement('a');
      link.download = `${date}-觉察回顾.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  return (
    <div className="bg-[#fdf6e3] min-h-screen flex flex-col items-center justify-center p-4">
      <div ref={contentRef} className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-serif text-center text-primary-700 mb-6">
          {date}
        </h2>
        <div className="mb-6 flex justify-center w-full">
          <MergedCards cards={cards} />
        </div>
        {/* 晨间觉察部分 */}
        <div className="journal-entry w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-8 mx-auto">
          <h2 className="text-xl font-serif text-primary-700 border-b border-primary-200 pb-2 mb-4">晨间觉察</h2>
          <div className="journal-paper p-4 rounded min-h-24">
            {morningNote || <span className="text-gray-400">今天还没有记录晨间觉察...</span>}
          </div>
        </div>
        {/* 夜间复盘部分 */}
        <div className="journal-entry w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-8 mx-auto">
          <h2 className="text-xl font-serif text-primary-700 border-b border-primary-200 pb-2 mb-4 flex justify-between items-center">
            <span>夜间复盘</span>
            {!canEditEvening && !eveningNote && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>18:00 后开放</span>
              </div>
            )}
          </h2>
          {eveningNote ? (
            <div className="journal-paper p-4 rounded min-h-24">
              {eveningNote}
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
              <span className="text-gray-400">18:00 后开放夜间复盘...</span>
            </div>
          )}
        </div>
        {/* 页脚 */}
        <footer className="p-4 text-center text-sm text-gray-600 w-full">
          © 2025 快乐的大人 | OH卡觉察日记
        </footer>
      </div>
      {/* 分享按钮 */}
      {morningNote && eveningNote && (
        <button
          onClick={handleShare}
          className="flex items-center px-6 py-3 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition-colors mx-auto mt-2"
        >
          <Share2 size={18} className="mr-2" />
          分享今日觉察
        </button>
      )}
    </div>
  );
} 