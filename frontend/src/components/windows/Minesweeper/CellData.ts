export type CellState = `unopened` | `opened` | `flagged`

export type EndState = `won` | `lost` | `neutral`

export interface CellPosition {
    x: number;
    y: number;
}

export interface CellData {
    position: CellPosition;
    count: number;
    isMine: boolean;
    state: CellState;
    endState: EndState;
}