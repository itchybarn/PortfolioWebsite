import { getNRandomEntries } from "@src/modules/genUtils";
import CellData, { type CellPosition } from "./CellData";
import { act } from "react";

export interface BoardState {
  cells: CellData[][];
  gameStarted: boolean;
  mineChance: number;
  potentialMines: Record<string, boolean>;
}

export type BoardAction =
  | { type: "reveal_cell"; position: CellPosition }
  | { type: "flag_cell"; position: CellPosition }

export function createInitialBoard({
  size = {x: 10, y: 10},
  mineChance = 15,
}): BoardState {
  const potentialMines: Record<string, boolean> = {};
  const cells = Array.from({ length: size.x }, (_, x) =>
    Array.from({ length: size.y }, (_, y): CellData => {
      potentialMines[`${x},${y}`] = true;
      return {
        position: {x, y},
        count: 0,
        isMine: false,
        state: "unopened"
      };
    }),
  );
  return {cells, gameStarted: false, mineChance, potentialMines}
}

export function boardReducer(state: BoardState, a: BoardAction): BoardState {
  const { x, y } = a.position
  const cell = state.cells[x][y]

  switch (a.type) {
    case "reveal_cell": {
      if (cell.state !== "unopened") return state;

      updateCells(state.cells, x, y, {state: "opened"});



      return {... state}
    }
    case "flag_cell": {
      if (cell.state === "opened") return state;

      return {...state}
    }
  }
}

function updateCells(cells: CellData[][], cx: number, cy: number, updates: Partial<CellData>): CellData[][] {
  const newCells = [...cells]
  const newColumn = [...newCells[cx]]
  newColumn[cy] = { ... newColumn[cy], ...updates };
  newCells[cx] = newColumn;
  return newCells
}










  function placeMines(cells: CellData[][], potentialMines: [string], startingCell: CellData) {
    const totalSize = cells.length * cells[0].length
    const totalMines = totalSize * 
    acessSurroundingCells(startingCell, (cell) => {
      delete potentialMines[`${cell.position.x},${cell.position.y}`]
    }, true)
    Object.keys(getNRandomEntries(potentialMines, this.totalSize)).map((cellPosition) => {
      const [x,y] = cellPosition.split(`,`).map(Number);
      placeMine(cells[x][y])
    })
  }

  function placeMine(cell: CellData) {
    cell.isMine = true;
    countSurroundingCells(cell);
  }

  function acessSurroundingCells(
    cells: CellData[][],
    startingCell: CellData,
    accessFunction: (cell: CellData) => void,
    shouldHitStarting: boolean = false,
  ) {
    for (let x = -1; x <= 1; x++) {
      let newCellX = startingCell.position.x + x;
      if (newCellX < 0 || newCellX >= cells.length) {
        continue;
      }
      let column = cells[newCellX];
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

  function countSurroundingCells(cell: CellData) {
    acessSurroundingCells(cell, (countingCell: CellData) => {
      countingCell.count += 1;
    });
  }
