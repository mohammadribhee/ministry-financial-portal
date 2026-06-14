function Requests() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Ministry Portal</h2>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/requests">Requests</a>
          <a href="/transactions">Transactions</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Requests</h1>
        </header>

        <p>Requests page will contain a table and add request form.</p>
      </main>
    </div>
  );
}

export default Requests;
