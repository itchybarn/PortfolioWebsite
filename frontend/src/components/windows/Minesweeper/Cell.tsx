import flagImg from "@src/assets/Minesweeper/minesweeper-flag.svg";
import mineImg from "@src/assets/Minesweeper/minesweeper-mine.svg";
import unopenedImg from "@src/assets/Minesweeper/minesweeper-block.svg";
import type { CellData } from "./CellData";
import type React from "react";

const countImages: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob("@src/assets/Minesweeper/minesweeper-*.svg", {
      eager: true,
      import: "default",
    }),
  ).map(([path, url]) => {
    const num = path.match(/minesweeper-(\d+)\.svg/)?.[1] ?? "";
    return [num, url as string];
  }),
);

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
      <div className="cell">
        {cell.state !== `opened` && (
          <img src={unopenedImg} alt="Background" className="cell-background" />
        )}
        {cell.state === `flagged` ? (
          <img src={flagImg} alt="Overlay" className="cell-overlay" />
        ) : (
          cell.state === `opened` &&
          (cell.isMine ? (
            <img src={mineImg} alt="Overlay" className="cell-overlay" />
          ) : (
            cell.count !== 0 && (
              <img
                src={countImages[cell.count]}
                alt="Overlay"
                className="cell-overlay"
              />
            )
          ))
        )}
      </div>
    </button>
  );
};

export default Cell;
