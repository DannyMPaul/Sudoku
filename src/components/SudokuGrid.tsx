import { Cell } from "@/components/Cell";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useCallback } from "react";

export const SudokuGrid = () => {
  const { grid, selectedCell, setSelectedCell, setCell } = useGameStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedCell) {
        // If no cell selected, select the first non-fixed cell
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (!grid[i][j].isFixed) {
              setSelectedCell(i, j);
              return;
            }
          }
        }
        return;
      }

      const { row, col } = selectedCell;

      // Handle number input
      if (e.key >= "1" && e.key <= "9") {
        if (!grid[row][col].isFixed) {
          setCell(row, col, parseInt(e.key));
        }
      }

      // Handle clear
      if (e.key === "Delete" || e.key === "Backspace" || e.key === " ") {
        e.preventDefault();
        if (!grid[row][col].isFixed) {
          setCell(row, col, 0);
        }
      }

      // Handle navigation
      let newRow = row;
      let newCol = col;

      if (e.key === "ArrowUp" && row > 0) {
        e.preventDefault();
        newRow = row - 1;
      }
      if (e.key === "ArrowDown" && row < 8) {
        e.preventDefault();
        newRow = row + 1;
      }
      if (e.key === "ArrowLeft" && col > 0) {
        e.preventDefault();
        newCol = col - 1;
      }
      if (e.key === "ArrowRight" && col < 8) {
        e.preventDefault();
        newCol = col + 1;
      }

      if (newRow !== row || newCol !== col) {
        setSelectedCell(newRow, newCol);
      }
    },
    [selectedCell, grid, setSelectedCell, setCell]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="bg-[#1e3a8a] dark:bg-[#fbbf24] p-3 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-9 gap-0 bg-white dark:bg-[#0a1628] rounded-xl overflow-hidden w-[500px] h-[500px]">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell.value}
              isFixed={cell.isFixed}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              hasError={cell.hasError}
              position={{ row: rowIndex, col: colIndex }}
            />
          ))
        )}
      </div>
    </div>
  );
};
