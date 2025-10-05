# Sudoku Game

A modern, interactive Sudoku puzzle game built with Next.js and TypeScript. Challenge yourself with different difficulty levels and enjoy a clean, responsive interface with both light and dark themes.

## Features

- **Four Difficulty Levels**: Easy, Medium, Hard, and Expert
- **Intelligent Validation**: Real-time error checking with visual feedback
- **Theme Support**: Toggle between light and dark modes
- **Keyboard Navigation**: Full keyboard support for seamless gameplay
- **Mistake Tracking**: Keep track of your errors
- **Reveal System**: Show incorrect answers when you need help
- **Responsive Design**: Works perfectly on desktop and mobile devices

## How to Play

1. **Select a Difficulty**: Choose from Easy (35 empty cells) to Expert (58 empty cells)
2. **Fill the Grid**: Use numbers 1-9 to complete the 9x9 grid
3. **Follow Sudoku Rules**: Each row, column, and 3x3 box must contain all digits 1-9
4. **Use Keyboard Controls**:
   - **Arrow Keys**: Navigate between cells
   - **Numbers 1-9**: Enter values
   - **Space/Delete**: Clear cell content
5. **Get Help**: Use the "Reveal Errors" button to highlight mistakes
6. **Win**: Complete the puzzle with all correct numbers!

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:3000`

### Building for Production

Create an optimized production build:

```bash
npm run build
npm start
```

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management
- **Headless UI**: Accessible UI components
- **Heroicons**: Beautiful icon library

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Main game page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Cell.tsx        # Individual grid cell
│   ├── SudokuGrid.tsx  # 9x9 game grid
│   └── DifficultySelector.tsx
├── store/              # State management
│   └── gameStore.ts    # Zustand game store
├── types/              # TypeScript definitions
│   └── sudoku.ts       # Game interfaces
└── utils/              # Helper functions
    ├── sudokuGenerator.ts
    └── sudokuValidator.ts
```

## Game Logic

The Sudoku generator creates valid puzzles by:

1. Generating a complete, solved 9x9 grid
2. Randomly removing numbers based on difficulty
3. Ensuring the puzzle has a unique solution

Validation happens in real-time, checking each move against the solution and providing immediate visual feedback.

## Customization

You can easily modify:

- **Colors**: Edit the Tailwind color scheme in components
- **Difficulty**: Adjust empty cell counts in `sudokuGenerator.ts`
- **Styling**: Customize the UI in component files
- **Features**: Add new functionality through the Zustand store

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

This project is open source and available under the MIT License.
