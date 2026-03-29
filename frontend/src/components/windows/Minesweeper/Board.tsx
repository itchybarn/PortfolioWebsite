import { useEffect, useReducer, useRef } from "react";
import Cell from "./Cell";
import { boardReducer, createInitialBoard } from "./BoardData";
import type { CellData, EndState } from "./CellData";

interface GameBoardProps {
  size?: { x: number; y: number };
  mineChance?: number;
}

const GameBoard = ({
  size = { x: 10, y: 10 },
  mineChance = 15,
}: GameBoardProps) => {
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [board, dispatch] = useReducer(
    boardReducer,
    { size, mineChance },
    createInitialBoard,
  );

  const triggerEndingAnimation = (startCell: CellData, endState: EndState) => {
    const visited = new Set<string>();
    let currentLayer = [startCell];
    let delay = 0;

    while (currentLayer.length > 0) {
      const nextLayer: CellData[] = [];

      for (const cell of currentLayer) {
        const key = `${cell.position.x},${cell.position.y}`;
        if (visited.has(key)) continue;
        visited.add(key);

        timeouts.current.push(
          setTimeout(() => {
            dispatch({
              type: "set_end_state",
              position: cell.position,
              endState: endState,
            });
          }, delay),
        );

        switch (endState) {
          case "won": {
            delay += 5;
            break;
          }
          case "lost": {
            if (cell.isMine) {
              delay += 25;
            }
            break;
          }
        }

        for (const [dx, dy] of [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ]) {
          const newX = cell.position.x + dx;
          const newY = cell.position.y + dy;
          if (
            newX >= 0 &&
            newX < board.cells.length &&
            newY >= 0 &&
            newY < board.cells[0].length
          ) {
            if (!visited.has(`${newX},${newY}`)) {
              nextLayer.push(board.cells[newX][newY]);
            }
          }
        }
      }

      currentLayer = nextLayer;
    }
  };

  const animationStarted = useRef(false);

  useEffect(() => {
    if (board.endState && !animationStarted.current) {
      animationStarted.current = true;
      triggerEndingAnimation(
        board.cells[board.endState.finalCell.x][board.endState.finalCell.y],
        board.endState.endState,
      );
    }
  }, [board.endState]);

  useEffect(() => {
    return () => {
      // runs only on unmount
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="game-board">
      {board.cells.map((column: CellData[], x) => {
        return (
          <div key={`column${x}`} className="cell-column">
            {column.map((cell: CellData) => {
              return (
                <Cell
                  key={`${cell.position.x},${cell.position.y}`}
                  cell={cell}
                  onLeftClick={(cell: CellData) =>
                    dispatch({ type: "reveal_cell", position: cell.position })
                  }
                  onRightClick={(cell: CellData) =>
                    dispatch({ type: "flag_cell", position: cell.position })
                  }
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
