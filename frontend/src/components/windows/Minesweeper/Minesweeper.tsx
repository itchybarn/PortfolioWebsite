import GameBoard from "./Board";
import "@src/css/Minesweeper.css";

interface Props {
  className: string;
}

const Minesweeper = ({ className }: Props) => {
  return (
    <div className={className}>
      <GameBoard />
    </div>
  );
};

export default Minesweeper;
