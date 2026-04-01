import ScrollingBackground from "./components/ScrollingBackground";
import backgroundTexture from "./assets/checkerboard.svg";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import pages from "./modules/pages";

function App() {
  return (
    <>
      <ScrollingBackground
        texture={backgroundTexture}
        tileSize={500}
        xSpeed={15}
        ySpeed={-40}
        color="rgb(44, 47, 94)"
      >
        <Navbar links={pages} />
        <div className="page-content">
          <Routes>
            {Object.entries(pages).map(([link, info]) => {
              return <Route path={link} element={<info.page />} />;
            })}
          </Routes>
        </div>
      </ScrollingBackground>
    </>
  );
}

export default App;
