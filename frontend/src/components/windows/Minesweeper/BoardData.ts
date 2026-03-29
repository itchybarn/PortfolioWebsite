import { getNRandomEntries } from "@src/modules/genUtils";
import { type CellData, type CellPosition, type EndState } from "./CellData";

export interface BoardState {
  cells: CellData[][];
  gameStarted: boolean;
  mineChance: number;
  potentialMines: Record<string, boolean>;
  endState?: BoardEndState;
  cellsLeftToReveal: number
}

interface BoardEndState {
  finalCell: CellPosition;
  endState: EndState;
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
  let cellsLeftToReveal = 0;
  const potentialMines: Record<string, boolean> = {};
  const cells = Array.from({ length: size.x }, (_, x) =>
    Array.from({ length: size.y }, (_, y): CellData => {
      potentialMines[`${x},${y}`] = true;
      cellsLeftToReveal += 1;
      return {
        position: { x, y },
        count: 0,
        isMine: false,
        state: "unopened",
        endState: `neutral`,
      };
    }),
  );

  return { cells, gameStarted: false, mineChance, potentialMines, cellsLeftToReveal };
}

export function boardReducer(prevState: BoardState, a: BoardAction): BoardState {
  const { x, y } = a.position;

  const createNewState = (): [BoardState, CellData] => {
    const state: BoardState = {
      ...prevState,
      cells: deepCopyCells(prevState.cells),
    }
    const cell = state.cells[x][y];

    return [state, cell]
  }

  switch (a.type) {
    case "reveal_cell": {
      if (prevState.endState) return prevState;

      const [state, cell] = createNewState();

      if (!state.gameStarted) {
        placeMines(state, cell);
      }
      state.gameStarted = true;

      revealCell(state, cell, true);

      if (state.cellsLeftToReveal <= 0) {
        state.endState = {
          endState: `won`,
          finalCell: cell.position,
        }
      }

      return state;
    }
    case "flag_cell": {
      if (prevState.endState) return prevState
      if (prevState.cells[x][y].state === "opened") return prevState;

      const [state, cell] = createNewState();

      cell.state = cell.state === `flagged` ? `unopened` : `flagged`;

      return state;
    }
    case "set_end_state": {
      const [state, cell] = createNewState();

      switch (a.endState) {
        case "lost": {
          if (cell.isMine) {
            cell.endState = a.endState;
            cell.state = `opened`;
          }
          break;
        }
        case "won": {
          if (!cell.isMine) {
            cell.endState = a.endState;
          }
          break;
        }
      }

      return state;
    }
  }
}

function revealCell(
  state: BoardState,
  revealedCell: CellData,
  first: boolean = false,
) {
  if (revealedCell.state == "flagged") return;

  const revealSurroundingCells = () => {
    acessSurroundingCells(state, revealedCell, (cell: CellData) => {
      revealCell(state, cell)
    });
  }

  // for clicking already open tiles
  if (revealedCell.state === "opened") {
    if (first) {
      revealSurroundingCells();
    }
    return;
  }

  revealedCell.state = "opened";
  state.cellsLeftToReveal--;
  if (revealedCell.isMine)
    state.endState = { finalCell: revealedCell.position, endState: `lost` };

  // for recursive zero tiles
  if (revealedCell.count == 0 && !revealedCell.isMine) {
    revealSurroundingCells();
  }
}

function placeMines(
  state: BoardState,
  startingCell: CellData,
) {
  const totalSize = state.cells.length * state.cells[0].length;
  const totalMines = totalSize * (state.mineChance * 0.01);
  acessSurroundingCells(
    state,
    startingCell,
    (cell: CellData) => {
      delete state.potentialMines[`${cell.position.x},${cell.position.y}`];
    },
    true,
  );
  Object.keys(getNRandomEntries(state.potentialMines, totalMines)).map(
    (cellPosition) => {
      const [x, y] = cellPosition.split(`,`).map(Number);
      state.cellsLeftToReveal--;
      placeMine(state, state.cells[x][y]);
    },
  );
}

function placeMine(state: BoardState, cell: CellData) {
  cell.isMine = true;
  countSurroundingCells(state, cell);
}

function acessSurroundingCells(
  state: BoardState,
  startingCell: CellData,
  accessFunction: (cell: CellData) => void,
  shouldHitStarting: boolean = false,
  orthogonal: boolean = false,
) {
  for (let x = -1; x <= 1; x++) {
    let newCellX = startingCell.position.x + x;
    if (newCellX < 0 || newCellX >= state.cells.length) {
      continue;
    }
    let column = state.cells[newCellX];
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

function countSurroundingCells(state: BoardState, cell: CellData) {
  acessSurroundingCells(state, cell, (countingCell: CellData) => {
    countingCell.count += 1;
  });
}
