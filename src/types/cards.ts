export interface CardData {
  id?: number;
  filename: string;
  type: 'image' | 'text';
  isFlipped: boolean;
}

export interface CardState {
  cards: CardData[];
  areMerged: boolean;
}