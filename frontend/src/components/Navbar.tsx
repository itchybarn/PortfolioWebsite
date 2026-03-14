import { NavLink } from "react-router-dom";
import { logo, type page } from "../modules/pages";
import "../css/Navbar.css";
import moon from "../assets/moon-fill.svg";

interface Props {
  links: { [key: string]: page };
  height?: string;
}

const Navbar = ({ links, height = "2rem" }: Props) => {
  const onClick = (/*e: React.MouseEvent*/) => {
    alert("Clicked!!! Still in progress.");
  };

  return (
    <div
      className="navbar-outer"
      style={{ ["--navbar-height" as string]: height }}
    >
      <nav className="navbar-inner">
        <div className="navbar-logo">
          <NavLink to="/">
            <img src={logo} className="white-image" />
          </NavLink>
        </div>
        <div className="navbar-links">
          {Object.entries(links).map(([link, info]) => {
            return (
              <NavLink key={link} to={link} className="nav-link">
                {info.name}
              </NavLink>
            );
          })}
        </div>
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={onClick}>
            <img src={moon} className="white-image" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
