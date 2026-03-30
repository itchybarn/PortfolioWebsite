import Board from "./Board";
import "@src/css/windows/MinesweeperGame.css";
import NewGameButton from "./NewGameButton";

interface Props {
  className: string;
}

const Minesweeper = ({ className }: Props) => {
  return (
    <div className={className}>
      <NewGameButton />
      <Board />
    </div>
  );
};

export default Minesweeper;
