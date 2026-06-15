function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Ministry Portal</h2>

      <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/requests">Requests</a>
        <a href="/transactions">Transactions</a>
      </nav>
    </aside>
  );
}

export default Sidebar;
