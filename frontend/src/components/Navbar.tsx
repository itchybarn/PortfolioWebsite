import { Link } from "react-router-dom";
import { logo, type page } from "../modules/pages";

interface Props {
  links: { [key: string]: page };
}

const Navbar = ({ links }: Props) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <div className="navbar-links">
        {Object.entries(links).map(([link, info]) => {
          return <Link to={link}>{info.name}</Link>;
        })}
      </div>
    </nav>
  );
};

export default Navbar;
