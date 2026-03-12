import ScrollingBackground from "./components/ScrollingBackground";
import backgroundTexture from "./assets/checkerboard.svg";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <ScrollingBackground
        texture={backgroundTexture}
        tileSize={500}
        xSpeed={15}
        ySpeed={-40}
        color="rgb(44, 47, 94)"
      />
      <Navbar links={{"/": "Home", "/minesweeper": "Minesweeper"}} />
    </>
  );
}

export default App;
