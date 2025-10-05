import { useGameStore } from "@/store/gameStore";
import clsx from "clsx";

interface CellProps {
  value: number | null;
  isFixed: boolean;
  isSelected: boolean;
  hasError: boolean;
  position: { row: number; col: number };
}

export const Cell = ({
  value,
  isFixed,
  isSelected,
  hasError,
  position,
}: CellProps) => {
  const setSelectedCell = useGameStore((state) => state.setSelectedCell);
  const revealed = useGameStore((state) => state.revealed);

  const handleClick = () => {
    if (!isFixed) {
      setSelectedCell(position.row, position.col);
    }
  };

  const getBorderClasses = () => {
    const borders = ["border"];
    if (position.row % 3 === 0) borders.push("border-t-[3px]");
    if (position.row === 8) borders.push("border-b-[3px]");
    if (position.col % 3 === 0) borders.push("border-l-[3px]");
    if (position.col === 8) borders.push("border-r-[3px]");
    return borders.join(" ");
  };

  const getTextColor = () => {
    if (isFixed) {
      return "text-[#1e3a8a] dark:text-[#fbbf24]";
    }
    if (!revealed) {
      return "text-[#fbbf24]"; // yellow for all user inputs before reveal
    }
    return hasError ? "text-red-600" : "text-[#fbbf24]";
  };

  return (
    <div
      className={clsx(
        "w-[55.5px] h-[55.5px] flex items-center justify-center relative",
        getBorderClasses(),
        "cursor-pointer select-none font-black text-3xl",
        "transition-all duration-150",
        "border-[#1e3a8a]/30 dark:border-[#fbbf24]/30",
        {
          "bg-white dark:bg-[#0a1628]": !isSelected && !isFixed,
          "bg-gray-100 dark:bg-[#1e3a8a]/30": isFixed && !isSelected,
          "hover:bg-blue-50 dark:hover:bg-[#1e3a8a]/20":
            !isFixed && !isSelected,
          "hover:scale-[1.02]": !isFixed,
        },
        getTextColor()
      )}
      onClick={handleClick}
    >
      {isSelected && (
        <div className="absolute inset-1 bg-blue-400/40 dark:bg-[#fbbf24]/40 rounded-sm pointer-events-none border-2 border-blue-500 dark:border-[#fbbf24]" />
      )}
      {value && <span className="relative z-10 drop-shadow-sm">{value}</span>}
    </div>
  );
};
