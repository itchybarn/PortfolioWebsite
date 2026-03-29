import { getNRandomEntries } from "@src/modules/genUtils";
import { type CellData, type CellPosition, type EndState } from "./CellData";

export interface BoardState {
  cells: CellData[][];
  gameStarted: boolean;
  mineChance: number;
  potentialMines: Record<string, boolean>;
  endState?: {
    finalCell: CellPosition;
    endState: EndState;
  };
}

export type BoardAction =
  | { type: "reveal_cell"; position: CellPosition }
  | { type: "flag_cell"; position: CellPosition }
  | { type: "set_end_state"; position: CellPosition; endState: EndState };

function deepCopyCells(cells: CellData[][]): CellData[][] {
  return cells.map((col) => col.map((c) => ({ ...c })));
}

export function createInitialBoard({
  size = { x: 10, y: 10 },
  mineChance = 15,
}): BoardState {
  const potentialMines: Record<string, boolean> = {};
  const cells = Array.from({ length: size.x }, (_, x) =>
    Array.from({ length: size.y }, (_, y): CellData => {
      potentialMines[`${x},${y}`] = true;
      return {
        position: { x, y },
        count: 0,
        isMine: false,
        state: "unopened",
        endState: `neutral`,
      };
    }),
  );

  return { cells, gameStarted: false, mineChance, potentialMines };
}

export function boardReducer(state: BoardState, a: BoardAction): BoardState {
  const { x, y } = a.position;

  switch (a.type) {
    case "reveal_cell": {
      if (state.endState) return { ...state }

      const newCells = deepCopyCells(state.cells);
      const cell = newCells[x][y];

      if (!state.gameStarted) {
        placeMines(newCells, cell, state.potentialMines, state.mineChance);
      }

      state.endState = revealCell(newCells, cell, true);

      console.log(state.endState);

      return {
        ...state,
        cells: newCells,
        gameStarted: true,
        endState: state.endState,
      };
    }
    case "flag_cell": {
      if (state.endState) return { ...state }
      
      if (state.cells[x][y].state === "opened") return state;

      const newCells = deepCopyCells(state.cells);
      const cell = newCells[x][y];

      cell.state = cell.state === `flagged` ? `unopened` : `flagged`;

      return { ...state, cells: newCells };
    }
    case "set_end_state": {
      const newCells = deepCopyCells(state.cells);
      const cell = newCells[x][y];
      if (cell.isMine) {
        cell.endState = a.endState;
        cell.state = `opened`;
      }
      return { ...state, cells: newCells };
    }
  }
}

function revealCell(
  cells: CellData[][],
  revealedCell: CellData,
  first: boolean = false,
): BoardState["endState"] {
  if (revealedCell.state == "flagged") return;

  const revealSurroundingCells = () => {
    let result: BoardState["endState"];
    acessSurroundingCells(cells, revealedCell, (cell: CellData) => {
      result = revealCell(cells, cell) ?? result;
    });
    return result
  }

  // for clicking already open tiles
  if (revealedCell.state === "opened") {
    if (first) {
      return revealSurroundingCells()
    }
    return undefined;
  }

  revealedCell.state = "opened";
  if (revealedCell.isMine)
    return { finalCell: revealedCell.position, endState: `lost` };

  // for recursive zero tiles
  if (revealedCell.count == 0 && !revealedCell.isMine) {
    return revealSurroundingCells()
  }

  return undefined
}

function placeMines(
  cells: CellData[][],
  startingCell: CellData,
  potentialMines: Record<string, boolean>,
  mineChance: number,
) {
  const totalSize = cells.length * cells[0].length;
  const totalMines = totalSize * (mineChance * 0.01);
  acessSurroundingCells(
    cells,
    startingCell,
    (cell: CellData) => {
      delete potentialMines[`${cell.position.x},${cell.position.y}`];
    },
    true,
  );
  Object.keys(getNRandomEntries(potentialMines, totalMines)).map(
    (cellPosition) => {
      const [x, y] = cellPosition.split(`,`).map(Number);
      placeMine(cells, cells[x][y]);
    },
  );
}

function placeMine(cells: CellData[][], cell: CellData) {
  cell.isMine = true;
  countSurroundingCells(cells, cell);
}

function acessSurroundingCells(
  cells: CellData[][],
  startingCell: CellData,
  accessFunction: (cell: CellData) => void,
  shouldHitStarting: boolean = false,
  orthogonal: boolean = false,
) {
  for (let x = -1; x <= 1; x++) {
    let newCellX = startingCell.position.x + x;
    if (newCellX < 0 || newCellX >= cells.length) {
      continue;
    }
    let column = cells[newCellX];
    for (let y = -1; y <= 1; y++) {
      let newCellY = startingCell.position.y + y;
      if (
        newCellY < 0 ||
        newCellY >= column.length ||
        (orthogonal && y !== 0 && x !== 0)
      ) {
        continue;
      }
      let newCell = column[newCellY];
      if (newCell === startingCell && !shouldHitStarting) {
        continue;
      }
      accessFunction(newCell);
    }
  }
}

function countSurroundingCells(cells: CellData[][], cell: CellData) {
  acessSurroundingCells(cells, cell, (countingCell: CellData) => {
    countingCell.count += 1;
  });
}
