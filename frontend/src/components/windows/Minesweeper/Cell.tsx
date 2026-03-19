import checkerboard from "@src/assets/checkerboard.svg";
import flagImg from "@src/assets/Minesweeper/flag-fill.svg";
import type { CellData } from "./CellData";

interface CellProps {
  cell: CellData;
  onLeftClick: (cell: CellData) => void;
  onRightClick: (cell: CellData) => void;
}

const Cell = ({ cell, onLeftClick, onRightClick }: CellProps) => {
  return (
    <button className="cell" onClick={() => {onLeftClick(cell)}} onContextMenu={() => {onRightClick(cell)}}>
      <img src={cell.state === `flagged` ? flagImg : checkerboard} />
      <span className="cell-text">
        {cell.state === `opened`
          ? cell.position.x +
            ", " +
            cell.position.y +
            " is" +
            (!cell.isMine ? " not" : "") +
            " a mine!"
          : ""}
      </span>
    </button>
  );
};

export default Cell;
