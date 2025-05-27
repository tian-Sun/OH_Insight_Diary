import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Calendar as CalendarIcon, Music, VolumeX } from 'lucide-react';
import JournalView from './components/JournalView';
import CardDrawView from './components/CardDrawView';
import Calendar from './components/Calendar';
import MergedCardsView from './components/MergedCardsView';
import { MorningReviewView } from './components/MorningReviewView';
import { useJournal } from './hooks/useJournal';
import { useCards } from './hooks/useCards';
import { useAudio } from './hooks/useAudio';
import { DayReviewView } from './components/DayReviewView';

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate] = useState(new Date());
  const dateString = format(currentDate, 'yyyy-MM-dd');
  const formattedDate = format(currentDate, 'yyyy年MM月dd日', { locale: zhCN });
  
  const { 
    todayEntry, 
    saveMorningNote, 
    saveEveningNote, 
    canEditEvening,
    getEntryByDate,
    hasCompletedMorning
  } = useJournal();
  
  const {
    cardState,
    drawCards,
    flipCard,
    mergeCards,
    resetCards
  } = useCards();
  
  const { playing, togglePlay } = useAudio('/background.mp3');
  
  const [view, setView] = useState('draw');

  useEffect(() => {
    // Reset everything at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 1, 0);
    
    const timeToMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimer = setTimeout(() => {
      resetCards();
      setView('draw');
    }, timeToMidnight);
    
    return () => clearTimeout(midnightTimer);
  }, [resetCards]);
  
  useEffect(() => {
    if (cardState.areMerged && !hasCompletedMorning) {
      setView('morningJournal');
    }
  }, [cardState.areMerged, hasCompletedMorning]);
  
  useEffect(() => {
    // 页面加载时根据本地缓存自动跳转到合适视图
    const saved = localStorage.getItem('oh-card-journal');
    if (saved) {
      const data = JSON.parse(saved);
      const today = format(new Date(), 'yyyy-MM-dd');
      const todayEntry = data.entries?.[today];
      if (todayEntry && todayEntry.morningNote) {
        // 已填写晨间记录，直接进入 merged 视图
        setView('merged');
        // 同步卡片状态
        if (todayEntry.cards) {
          resetCards();
          setTimeout(() => {
            // 直接设置卡片状态（需要 useCards 支持外部设置）
            // 这里只能通过 drawCards/flipCard 等方式间接实现，或需扩展 useCards
          }, 0);
        }
      } else if (todayEntry && todayEntry.cards) {
        // 已抽卡但未填写晨间记录，进入 morningJournal
        setView('morningJournal');
        if (todayEntry.cards) {
          resetCards();
          setTimeout(() => {
            // 同上
          }, 0);
        }
      } else {
        setView('draw');
      }
    } else {
      setView('draw');
    }
  }, []);
  
  const handleCalendarSelect = (date: Date) => {
    const entry = getEntryByDate(format(date, 'yyyy-MM-dd'));
    if (entry) {
      // View historical entry
      // Implementation could be added here
    }
    setShowCalendar(false);
  };
  
  const renderCurrentView = () => {
    console.log('App renderCurrentView:', { view, cardState, todayEntry });
    switch (view) {
      case 'draw':
        return (
          <CardDrawView 
            cardState={cardState} 
            onCardFlip={flipCard} 
            onCardsMerge={mergeCards}
            onDraw={drawCards}
          />
        );
      case 'morningJournal':
        return (
          <JournalView 
            type="morning"
            cards={todayEntry?.cards && todayEntry.cards.length > 0 ? todayEntry.cards : cardState.cards}
            onSave={(note) => {
              saveMorningNote(note, cardState.cards);
              setView('morningReview');
            }}
          />
        );
      case 'morningReview':
        return (
          <MorningReviewView
            cards={todayEntry?.cards || []}
            note={todayEntry?.morningNote || ''}
            onEveningClick={() => setView('eveningJournal')}
            canEditEvening={canEditEvening}
            eveningNote={todayEntry?.eveningNote}
          />
        );
      case 'eveningJournal':
        return (
          <JournalView 
            type="evening"
            cards={todayEntry?.cards && todayEntry.cards.length > 0 ? todayEntry.cards : cardState.cards}
            onSave={(note) => {
              saveEveningNote(note);
              setView('merged');
            }}
          />
        );
      case 'merged':
      default:
        return (
          <DayReviewView
            date={formattedDate}
            cards={todayEntry?.cards || []}
            morningNote={todayEntry?.morningNote || ''}
            eveningNote={todayEntry?.eveningNote}
            canEditEvening={canEditEvening}
            onEveningClick={() => setView('eveningJournal')}
          />
        );
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="date-display fade-in">{formattedDate}</div>
        <div className="flex space-x-4">
          <button 
            onClick={togglePlay}
            className="p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all shadow-sm"
            aria-label={playing ? "Mute background music" : "Play background music"}
          >
            {playing ? <Music size={24} /> : <VolumeX size={24} />}
          </button>
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all shadow-sm"
            aria-label="Open calendar"
          >
            <CalendarIcon size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {showCalendar && (
          <div className="absolute top-0 right-0 mt-16 mr-4 z-10">
            <Calendar onSelect={handleCalendarSelect} />
          </div>
        )}
        
        <div className="max-w-lg w-full mx-auto">
          {renderCurrentView()}
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-600">
        © 2025 快乐的大人 | OH卡觉察日记
      </footer>
    </div>
  );
}

export default App;