import "../css/ScrollingBackground.css";

interface Props {
  texture: string;
  tileSize: number;
  xSpeed?: number;
  ySpeed?: number;
  color?: string;
}

const ScrollingBackground = ({
  texture,
  tileSize,
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
    />
  );
};

export default ScrollingBackground;
