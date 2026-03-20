import checkerboard from "@src/assets/checkerboard.svg";
import flagImg from "@src/assets/Minesweeper/flag-fill.svg";
import type { CellData } from "./CellData";
import type React from "react";

interface CellProps {
  cell: CellData;
  onLeftClick: (cell: CellData) => void;
  onRightClick: (cell: CellData) => void;
}

const Cell = ({ cell, onLeftClick, onRightClick }: CellProps) => {
  return (
    <button
      className="cell"
      onClick={() => {
        onLeftClick(cell);
      }}
      onContextMenu={(e: React.MouseEvent) => {
        e.preventDefault();
        onRightClick(cell);
      }}
    >
      <img src={cell.state === `flagged` ? flagImg : checkerboard} />
      <span className="cell-text">
        {cell.state === `opened` ? cell.count : ""}
      </span>
    </button>
  );
};

export default Cell;
