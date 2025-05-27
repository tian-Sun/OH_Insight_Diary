import { useState } from 'react';
import { CardState, CardData } from '../types/cards';
import { imageCardFilenames, wordCardFilenames } from '../constants/card-filenames';

function getRandomImageCardFilename() {
  const idx = Math.floor(Math.random() * imageCardFilenames.length);
  return imageCardFilenames[idx];
}
function getRandomWordCardFilename() {
  const idx = Math.floor(Math.random() * wordCardFilenames.length);
  return wordCardFilenames[idx];
}

export const useCards = () => {
  const [cardState, setCardState] = useState<CardState>({
    cards: [],
    areMerged: false
  });
  
  // Draw new cards
  const drawCards = () => {
    setCardState({
      cards: [
        { filename: getRandomImageCardFilename(), type: 'image', isFlipped: false },
        { filename: getRandomWordCardFilename(), type: 'text', isFlipped: false }
      ],
      areMerged: false
    });
  };
  
  // Flip a card
  const flipCard = (index: number) => {
    setCardState(prev => {
      const updatedCards = [...prev.cards];
      updatedCards[index] = { ...updatedCards[index], isFlipped: true };
      return {
        ...prev,
        cards: updatedCards
      };
    });
  };
  
  // Merge the cards after both are flipped
  const mergeCards = () => {
    setCardState(prev => ({
      ...prev,
      areMerged: true
    }));
  };
  
  // Reset the card state
  const resetCards = () => {
    setCardState({
      cards: [],
      areMerged: false
    });
  };
  
  return {
    cardState,
    drawCards,
    flipCard,
    mergeCards,
    resetCards
  };
};