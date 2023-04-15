import { Link } from "react-router-dom";
  
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Cooking app</Link>
      <Link to="/create" className="btn btn-primary">
        Create recipe
      </Link>
    </nav>
  );
}