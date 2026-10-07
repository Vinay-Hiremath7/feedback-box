import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>💬 Suggestion Box</h2>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/feedback">Give Feedback</Link>
        <Link to="/board">Feedback Board</Link>
        <Link to="/tasks">Task Tracker</Link>
      </div>
    </nav>
  );
}

export default Navbar;