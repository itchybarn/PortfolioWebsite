export type CELL_STATE = `unopened` | `opened` | `flagged`

export interface CellPosition {
    x: number;
    y: number;
}

export default class CellData {
    position: CellPosition;
    count: number = 0;
    isMine: boolean = false;
    state: CELL_STATE = 'unopened';

    constructor(position: CellPosition) {
        this.position = position;
    }
}