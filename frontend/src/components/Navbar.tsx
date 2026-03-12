import { Link } from "react-router-dom"

interface Props {
    links: {[key: string]: string}
}

const Navbar = ({ links }: Props) => {
  return <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">{links["/"]}</Link>
    </div>
    <div className="navbar-links">
        {Object.entries(links).map(([link, label]) => {
            return <Link to={link}>{label}</Link>
        })}
    </div>
  </nav>
}

export default Navbar