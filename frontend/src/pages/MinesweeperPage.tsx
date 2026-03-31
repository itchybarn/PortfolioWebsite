import Window from "@src/components/Window";
import Minesweeper from "../components/windows/Minesweeper/Minesweeper";
import "@src/css/pages/MinesweeperPage.css";

const MinesweeperPage = () => {
  return (
    <div className="minesweeperPage">
      <Window name="Minesweeper">
        <Minesweeper className="minesweeper" />
      </Window>
    </div>
  );
};

export default MinesweeperPage;
