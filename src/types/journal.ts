import { CardData } from './cards';

export interface JournalEntry {
  morningNote?: string;
  eveningNote?: string;
  imageCardId?: number;
  textCardId?: number;
  timestamp: number;
  cards?: CardData[];
}