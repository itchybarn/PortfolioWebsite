import Home from "../pages/Home";
import MinesweeperPage from "../pages/MinesweeperPage";
import type React from "react";
import cardImage from "../assets/card-image.svg";
import Projects from "../pages/Projects";

export const logo = cardImage;

export interface page {
  name: string;
  page: React.ComponentType;
}

const pages = {
  "/": {
    name: "Home",
    page: Home,
  },
  "/minesweeper": {
    name: "Minesweeper",
    page: MinesweeperPage,
  },
  "/projects": {
    name: "Projects",
    page: Projects,
  },
};

export default pages;
