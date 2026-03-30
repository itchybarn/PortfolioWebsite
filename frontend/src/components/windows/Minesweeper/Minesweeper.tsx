import Board from "./Board";
import "@src/css/windows/MinesweeperGame.css";
import NewGameButton from "./NewGameButton";
import { useRef, useState } from "react";

interface Props {
  className: string;
}

const MIN_BOARD_SIZE = 5;
const MAX_BOARD_SIZE = 20;
const DEFAULT_BOARD_SIZE = 10;

const MIN_MINE_CHANCE = 10;
const MAX_MINE_CHANCE = 30;
const DEFAULT_MINE_CHANCE = 18;

const Minesweeper = ({ className }: Props) => {
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);
  const [mineChance, setMineChance] = useState(DEFAULT_MINE_CHANCE);
  const [gameId, setGameId] = useState(0);

  return (
    <div className={className}>
      <div className="option-header">
        <input
          type="range"
          min={MIN_BOARD_SIZE}
          max={MAX_BOARD_SIZE}
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
          step={1}
        />
        <NewGameButton onNewGame={() => setGameId(id => id + 1)}/>
        <input
          type="range"
          min={MIN_MINE_CHANCE}
          max={MAX_MINE_CHANCE}
          value={mineChance}
          onChange={(e) => setMineChance(Number(e.target.value))}
          step={1}
        />
      </div>
      <Board key={gameId} size={{ x: boardSize, y: boardSize }} mineChance={mineChance} />
    </div>
  );
};

export default Minesweeper;
