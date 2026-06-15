import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 font-medium transition ${
      isActive ? "bg-blue-400/40 text-white" : "text-white hover:bg-white/10"
    }`;

  return (
    <aside className="w-full bg-blue-900 p-4 text-white md:min-h-screen md:w-64 md:p-6">
      <h2 className="mb-6 text-2xl font-bold">Ministry Portal</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/requests" className={linkClass}>
          Requests
        </NavLink>

        <NavLink to="/transactions" className={linkClass}>
          Transactions
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
