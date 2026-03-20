import { getNRandomEntries } from "@src/modules/genUtils";
import { type CellData, type CellPosition } from "./CellData";

export interface BoardState {
  cells: CellData[][];
  gameStarted: boolean;
  mineChance: number;
  potentialMines: Record<string, boolean>;
}

export type BoardAction =
  | { type: "reveal_cell"; position: CellPosition }
  | { type: "flag_cell"; position: CellPosition }

function deepCopyCells(cells: CellData[][]): CellData[][] {
  return cells.map(col => col.map(c => ({ ...c })))
}

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

  switch (a.type) {
    case "reveal_cell": {
      if (state.cells[x][y].state !== "unopened") return state;

      const newCells = deepCopyCells(state.cells);
      const cell = newCells[x][y];

      if (!state.gameStarted) {
        placeMines(newCells, cell, state.potentialMines, state.mineChance);
      }

      revealCell(newCells, cell);

      return {...state, cells: newCells, gameStarted: true};
    }
    case "flag_cell": {
      if (state.cells[x][y].state === "opened") return state;

      const newCells = deepCopyCells(state.cells);
      const cell = newCells[x][y];

      cell.state = cell.state === `flagged` ? `unopened` : `flagged`;

      return {...state, cells: newCells};
    }
  }
}

function revealCell(cells: CellData[][], revealedCell: CellData) {
  if (revealedCell.state !== "unopened") return;
  revealedCell.state = "opened";

  if (revealedCell.count == 0) {
    acessSurroundingCells(cells, revealedCell, (cell: CellData) => {
      revealCell(cells, cell)
    })
  }

}

function placeMines(cells: CellData[][], startingCell: CellData, potentialMines: Record<string, boolean>, mineChance: number) {
  const totalSize = cells.length * cells[0].length
  const totalMines = totalSize * (mineChance * 0.01)
  acessSurroundingCells(cells, startingCell, (cell: CellData) => {
    delete potentialMines[`${cell.position.x},${cell.position.y}`]
  }, true)
  Object.keys(getNRandomEntries(potentialMines, totalMines)).map((cellPosition) => {
    const [x,y] = cellPosition.split(`,`).map(Number);
    placeMine(cells, cells[x][y])
  })
}

function placeMine(cells: CellData[][], cell: CellData) {
  cell.isMine = true
  countSurroundingCells(cells, cell);
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

function countSurroundingCells(cells: CellData[][], cell: CellData) {
  acessSurroundingCells(cells, cell, (countingCell: CellData) => {
    countingCell.count += 1;
  });
}
