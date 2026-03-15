import { getNRandomEntries } from "@src/modules/genUtils";
import CellData from "./CellData";

export default class BoardData {
  potentialMines: Record<string, boolean> = {};
  cells: CellData[][];
  size: { x:number, y:number };
  mineChance: number;

  constructor(size = { x: 10, y: 10 }, mineChance = 15) {
    this.size = size
    this.mineChance = mineChance;

    this.cells = Array.from({ length: size.x }, (_, x) =>
      Array.from({ length: size.y }, (_, y) => {
        this.potentialMines[`${x},${y}`] = true;
        return new CellData({x, y});
      }),
    );
  }

  get totalSize() {
    return this.size.x*this.size.y*(this.mineChance*0.01)
  }

  placeMines(startingCell: CellData) {
    this.acessSurroundingCells(startingCell, (cell) => {
      delete this.potentialMines[`${cell.position.x},${cell.position.y}`]
    }, true)
    Object.keys(getNRandomEntries(this.potentialMines, this.totalSize)).map((cellPosition) => {
      const [x,y] = cellPosition.split(`,`).map(Number);
      this.placeMine(this.cells[x][y])
    })
  }

  placeMine(cell: CellData) {
    cell.isMine = true;
    this.countSurroundingCells(cell);
  }

  acessSurroundingCells(
    startingCell: CellData,
    accessFunction: (cell: CellData) => void,
    shouldHitStarting: boolean = false,
  ) {
    for (let x = -1; x <= 1; x++) {
      let newCellX = startingCell.position.x + x;
      if (newCellX < 0 || newCellX >= this.cells.length) {
        continue;
      }
      let column = this.cells[newCellX];
      for (let y = -1; y <= 1; y++) {
        let newCellY = startingCell.position.y + y;
        if (newCellY < 0 || newCellY >= column.length) {
          continue;
        }
        let newCell = column[newCellY];
        if (newCell === startingCell && !shouldHitStarting) { continue; }
        accessFunction(newCell);
      }
    }
  }

  countSurroundingCells(cell: CellData) {
    this.acessSurroundingCells(cell, (countingCell: CellData) => {
      countingCell.count += 1;
    });
  }
}
