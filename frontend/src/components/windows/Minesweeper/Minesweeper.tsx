import Board from "./Board";
import "@src/css/windows/MinesweeperGame.css";
import NewGameButton from "./NewGameButton";
import { useRef, useState } from "react";
import SliderBlock from "./SliderBlock";

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
        <SliderBlock
          title={`Mine Chance`}
          min={MIN_MINE_CHANCE}
          max={MAX_MINE_CHANCE}
          originalValue={mineChance}
          onChange={(value) => setMineChance(value)}
        />
        <NewGameButton onNewGame={() => setGameId((id) => id + 1)} />
        <SliderBlock
          title={`Board Size`}
          min={MIN_BOARD_SIZE}
          max={MAX_BOARD_SIZE}
          originalValue={boardSize}
          onChange={(value) => setBoardSize(value)}
        />
      </div>
      <Board
        key={gameId}
        size={{ x: boardSize, y: boardSize }}
        mineChance={mineChance}
      />
    </div>
  );
};

export default Minesweeper;
