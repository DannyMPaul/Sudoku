import { Difficulty, GridType } from '../types/sudoku';

const GRID_SIZE = 9;

function isValidPlacement(grid: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let y = 0; y < GRID_SIZE; y++) {
    if (grid[y][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[boxRow + y][boxCol + x] === num) return false;
    }
  }

  return true;
}

function solveSudoku(grid: number[][]): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function createEmptyGrid(): number[][] {
  return Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
}

function generateFilledGrid(): number[][] {
  const grid = createEmptyGrid();
  solveSudoku(grid);
  return grid;
}

function getEmptyCellCount(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 35;
    case 'medium': return 45;
    case 'hard': return 52;
    case 'expert': return 58;
    default: return 45;
  }
}

export function generateSudoku(difficulty: Difficulty): { puzzle: GridType, solution: GridType } {
  const solution = generateFilledGrid();
  const emptyCellCount = getEmptyCellCount(difficulty);
  const positions = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);

  // Shuffle positions for random cell removal
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  // Create the puzzle grid with empty cells
  const puzzle: GridType = solution.map(row => [...row]);

  // Remove numbers based on difficulty
  for (let i = 0; i < emptyCellCount; i++) {
    const pos = positions[i];
    const row = Math.floor(pos / GRID_SIZE);
    const col = pos % GRID_SIZE;
    puzzle[row][col] = null;
  }

  return { puzzle, solution };
}
