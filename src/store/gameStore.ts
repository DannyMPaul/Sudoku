import { create } from 'zustand';
import { GameState, Difficulty, Cell } from '../types/sudoku';
import { generateSudoku } from '../utils/sudokuGenerator';
import { validateMove } from '../utils/sudokuValidator';

interface GameStore extends GameState {
  initializeGame: () => void;
  setCell: (row: number, col: number, value: number) => void;
  setSelectedCell: (row: number, col: number) => void;
  validateMove: (row: number, col: number, value: number) => boolean;
  setDifficulty: (difficulty: Difficulty) => void;
  setRevealed: (revealed: boolean) => void;
}

const createEmptyGrid = (): Cell[][] =>
  Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({
      value: null,
      isFixed: false,
      hasError: false
    }))
  );

const initialState: GameState = {
  grid: createEmptyGrid(),
  difficulty: 'medium',
  selectedCell: null,
  isComplete: false,
  mistakes: 0,
  solution: Array(9).fill(null).map(() => Array(9).fill(null)),
  revealed: false
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  initializeGame: () => {
    const { difficulty } = get();
    const { puzzle, solution } = generateSudoku(difficulty);
    const newGrid: Cell[][] = puzzle.map((rowValues: (number | null)[]) =>
      rowValues.map((value: number | null) => ({
        value,
        isFixed: value !== null,
        hasError: false
      }))
    );

    set({
      grid: newGrid,
      solution,
      mistakes: 0,
      isComplete: false,
      selectedCell: null,
      revealed: false
    });
  },

  setDifficulty: (difficulty: Difficulty) => {
    set({ difficulty });
  },

  setCell: (row: number, col: number, value: number) => {
    const { grid, solution } = get();
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    if (!newGrid[row][col].isFixed) {
      if (value === 0) {
        // Clear the cell
        newGrid[row][col] = {
          value: null,
          isFixed: false,
          hasError: false
        };
      } else {
        const isValid = validateMove(row, col, value, solution);
        newGrid[row][col] = {
          value,
          isFixed: false,
          hasError: !isValid
        };

        if (!isValid) {
          set(state => ({ mistakes: state.mistakes + 1 }));
        }
      }
    }

    const isComplete = newGrid.every((row, i) =>
      row.every((cell, j) => cell.value === solution[i][j])
    );

    set({
      grid: newGrid,
      isComplete
    });
  },

  setSelectedCell: (row: number, col: number) => {
    set({ selectedCell: { row, col } });
  },

  validateMove: (row: number, col: number, value: number) => {
    const { solution } = get();
    return solution[row][col] === value;
  },

  setRevealed: (revealed: boolean) => {
    set({ revealed });
  }
}));
