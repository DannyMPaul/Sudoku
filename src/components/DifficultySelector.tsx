import { useGameStore } from "@/store/gameStore";
import { Difficulty } from "@/types/sudoku";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const difficulties: { name: string; value: Difficulty }[] = [
  { name: "EASY", value: "easy" },
  { name: "MEDIUM", value: "medium" },
  { name: "HARD", value: "hard" },
  { name: "EXPERT", value: "expert" },
];

export const DifficultySelector = () => {
  const { difficulty, setDifficulty, initializeGame } = useGameStore();

  const handleChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    initializeGame();
  };

  const currentDifficulty = difficulties.find((d) => d.value === difficulty);

  return (
    <div className="w-48">
      <Listbox value={difficulty} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white dark:bg-[#0a1628] py-3 pl-5 pr-12 text-left shadow-lg hover:shadow-xl transition-all border-2 border-[#1e3a8a] dark:border-[#fbbf24] focus:outline-none focus:ring-4 focus:ring-[#1e3a8a]/50 dark:focus:ring-[#fbbf24]/50">
            <span className="block truncate font-black text-lg text-[#1e3a8a] dark:text-[#fbbf24]">
              {currentDifficulty?.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className="h-6 w-6 text-[#1e3a8a] dark:text-[#fbbf24]"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-[#0a1628] py-1 shadow-2xl border-2 border-[#1e3a8a] dark:border-[#fbbf24] focus:outline-none">
            {difficulties.map((diff) => (
              <Listbox.Option
                key={diff.value}
                value={diff.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-3 pl-5 pr-4 transition-colors ${
                    active ? "bg-blue-100 dark:bg-[#1e3a8a]/50" : ""
                  }`
                }
              >
                {({ selected }) => (
                  <span
                    className={`block truncate font-black text-lg text-[#1e3a8a] dark:text-[#fbbf24] ${
                      selected ? "underline underline-offset-4" : ""
                    }`}
                  >
                    {diff.name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
