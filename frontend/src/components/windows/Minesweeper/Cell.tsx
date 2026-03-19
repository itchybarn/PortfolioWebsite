import checkerboard from "@src/assets/checkerboard.svg";
import flagImg from "@src/assets/Minesweeper/flag-fill.svg";
import CellData from "./CellData";

interface CellProps {
  cell: CellData;
  onCellReveal: (cell: CellData) => void;
}

const Cell = ({ cell, onCellReveal }: CellProps) => {
  const onLeftClick = () => {
    if (cell.state === `opened` || cell.state === `flagged`) {
      return;
    }
    cell.state = `opened`;
    onCellReveal(cell);
  };

  const onRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cell.state === `opened`) {
      return;
    }

    cell.state = cell.state === `flagged` ? `opened` : `flagged`;
  };

  return (
    <button className="cell" onClick={onLeftClick} onContextMenu={onRightClick}>
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
