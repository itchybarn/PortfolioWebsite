import { NavLink } from "react-router-dom";
import { logo, type page } from "../modules/pages";
import "../css/Navbar.css";

interface Props {
  links: { [key: string]: page };
}

const Navbar = ({ links }: Props) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={logo} />
        </NavLink>
      </div>
      <div className="navbar-links">
        {Object.entries(links).map(([link, info]) => {
          return (
            <NavLink to={link} className="nav-link">
              {info.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
