import MinesweeperWindow from "../components/windows/Minesweeper/Minesweeper";
import "@src/css/pages/MinesweeperPage.css"

const MinesweeperPage = () => {
  return <div className="minesweeperPage">
    <h2 className="header">Minesweeper, still in progress. But it does work!</h2>
    <MinesweeperWindow className="minesweeper"/>
    </div>;
};

export default MinesweeperPage;
