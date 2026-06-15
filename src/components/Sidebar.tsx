import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Ministry Portal</h2>

      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/requests"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Requests
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Transactions
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
