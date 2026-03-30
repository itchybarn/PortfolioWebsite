import { type ReactNode } from "react";
import "@src/css/Window.css"

interface WindowProps {
    name: string;
  children: ReactNode;
}

const Window = ({ name, children }: WindowProps) => {
  return (
    <div>
      <div className="title-bar">{name}</div>
      <div>{children}</div>
    </div>
  );
};

export default Window;
