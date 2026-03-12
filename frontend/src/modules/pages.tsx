import Home from "../pages/Home";
import Minesweeper from "../pages/Minesweeper";
import type React from "react";
import cardImage from "../assets/card-image.svg";

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
    page: Minesweeper,
  },
};

export default pages;
