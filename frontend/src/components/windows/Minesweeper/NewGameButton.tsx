import SmileImage from "@src/assets/Minesweeper/minesweeper-smile.svg"
import CellImage from "@src/assets/Minesweeper/minesweeper-block.svg"
import "@src/css/windows/MinesweeperGame.css"

interface NewGameButtonProps {
    onNewGame: () => void;
}

const NewGameButton = ({ onNewGame }: NewGameButtonProps) => {
  return (
    <button className="new-game-button" onClick={onNewGame}>
        <img src={CellImage} className="cell-background" />
        <img src={SmileImage} className="cell-overlay"/>
    </button>
  )
}

export default NewGameButton