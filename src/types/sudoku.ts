export type CellValue = number | null;
export type GridType = CellValue[][];
export type Position = { row: number; col: number };

export interface Cell {
  value: CellValue;
  isFixed: boolean;
  hasError: boolean;
}

export type GameGrid = Cell[][];

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface GameState {
  grid: GameGrid;
  difficulty: Difficulty;
  selectedCell: Position | null;
  isComplete: boolean;
  mistakes: number;
  solution: GridType;
  revealed: boolean;
}
