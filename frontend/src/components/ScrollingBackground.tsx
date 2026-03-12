import { type ReactNode } from "react";
import "../css/ScrollingBackground.css";

interface Props {
  texture: string;
  children: ReactNode;
  tileSize: number;
  xSpeed?: number;
  ySpeed?: number;
  color?: string;
}

const ScrollingBackground = ({
  texture,
  children,
  tileSize = 500,
  xSpeed = 5,
  ySpeed = 5,
  color = "rgba(255, 255, 255, 0)",
}: Props) => {
  return (
    <div
      className="scrolling-bg"
      style={{
        backgroundImage: `url(${texture})`,
        backgroundSize: `${tileSize}px ${tileSize}px`,
        ["--color" as string]: color,
        ["--tile-w" as string]: `${Math.sign(xSpeed) * tileSize}px`,
        ["--tile-h" as string]: `${Math.sign(ySpeed) * tileSize}px`,
        ["--speed-x" as string]: `${Math.abs(xSpeed)}s`,
        ["--speed-y" as string]: `${Math.abs(ySpeed)}s`,
      }}
    >
      <div className="scrolling-bg-content">{children}</div>
    </div>
  );
};

export default ScrollingBackground;
