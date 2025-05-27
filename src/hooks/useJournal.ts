import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { JournalEntry } from '../types/journal';
import { CardData } from '../types/cards';

interface JournalState {
  entries: Record<string, JournalEntry>;
}

export const useJournal = () => {
  const [journalState, setJournalState] = useState<JournalState>(() => {
    const savedData = localStorage.getItem('oh-card-journal');
    return savedData ? JSON.parse(savedData) : { entries: {} };
  });
  
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayEntry = journalState.entries[today];
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('oh-card-journal', JSON.stringify(journalState));
  }, [journalState]);
  
  // Determine if evening journal can be edited (after 6pm)
  const canEditEvening = () => {
    const now = new Date();
    return now.getHours() >= 15;
  };
  
  // Save morning note
  const saveMorningNote = (note: string, cards: CardData[]) => {
    setJournalState(prev => {
      const updatedEntries = {
        ...prev.entries,
        [today]: {
          ...prev.entries[today],
          morningNote: note,
          cards,
          timestamp: Date.now()
        }
      };
      
      return {
        ...prev,
        entries: updatedEntries
      };
    });
  };
  
  // Save evening note
  const saveEveningNote = (note: string) => {
    // Only allow saving evening note after 6pm
    if (!canEditEvening()) return;
    
    setJournalState(prev => {
      const updatedEntries = {
        ...prev.entries,
        [today]: {
          ...prev.entries[today],
          eveningNote: note,
          timestamp: Date.now()
        }
      };
      
      return {
        ...prev,
        entries: updatedEntries
      };
    });
  };
  
  // Get entry by date
  const getEntryByDate = (date: string): JournalEntry | undefined => {
    return journalState.entries[date];
  };
  
  // Check if an entry exists for a date
  const hasEntry = (date: string): boolean => {
    return !!journalState.entries[date];
  };
  
  // Check if user has completed morning journal
  const hasCompletedMorning = !!todayEntry?.morningNote;
  
  return {
    journalState,
    todayEntry,
    canEditEvening: canEditEvening(),
    saveMorningNote,
    saveEveningNote,
    getEntryByDate,
    hasEntry,
    hasCompletedMorning
  };
};