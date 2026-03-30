import SmileImage from "@src/assets/Minesweeper/minesweeper-smile.svg"
import CellImage from "@src/assets/Minesweeper/minesweeper-block.svg"
import "@src/css/windows/MinesweeperGame.css"

const NewGameButton = () => {
  return (
    <button className="new-game-button">
        <img src={CellImage} className="cell-background" />
        <img src={SmileImage} className="cell-overlay"/>
    </button>
  )
}

export default NewGameButton