import { GridType } from '../types/sudoku';

export function validateMove(row: number, col: number, value: number, solution: GridType): boolean {
  return solution[row][col] === value;
}
