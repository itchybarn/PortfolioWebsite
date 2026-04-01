import Window from "@src/components/Window";
import Minesweeper from "../components/windows/Minesweeper/Minesweeper";
import "@src/css/pages/MinesweeperPage.css";
import "@src/css/pages/Page.css";

const MinesweeperPage = () => {
  return (
    <div className="page minesweeperPage">
      <Window name="Minesweeper" height="50%">
        <Minesweeper className="minesweeper" />
      </Window>
    </div>
  );
};

export default MinesweeperPage;
