import { useState } from "react";
import Cell from "./Cell";
import BoardData from "./BoardData";
import type CellData from "./CellData";

interface GameBoardProps {
  size?: { x: number; y: number };
  mineChance?: number;
}

const GameBoard = ({
  size = { x: 10, y: 10 },
  mineChance = 80,
}: GameBoardProps) => {
  const [board] = useState(() => new BoardData(size, mineChance));
  const [gameStarted, setGameStarted] = useState(false);

  const onCellReveal = (cell: CellData) => {
    if (!gameStarted) {
      board.placeMines(cell);
      setGameStarted(true);
    }
  };

  return (
    <div className="game-board">
      {board.cells.map((column: CellData[], x) => {
        return (
          <div key={`column${x}`} className="cell-column">
            {column.map((cell: CellData) => {
              return (
                <Cell
                  key={`${cell.position.x},${cell.position.y}`}
                  cell={cell}
                  onCellReveal={onCellReveal}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
