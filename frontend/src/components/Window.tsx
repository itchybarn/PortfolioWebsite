import { type ReactNode } from "react";
import "@src/css/Window.css";

interface WindowProps {
  name: string;
  children: ReactNode;
  width?: string;
  height?: string;
}

const Window = ({ name, children, width, height }: WindowProps) => {
  return (
    <div
      className="window"
      style={{
        ...(width && { ["--width" as string]: width }),
        ...(height && { ["--height" as string]: height }),
      }}
    >
      <div className="title-bar">{name}</div>
      <div className="window-content">{children}</div>
    </div>
  );
};

export default Window;
