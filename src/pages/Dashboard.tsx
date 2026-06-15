import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/sidebar.css";
import Sidebar from "../components/Sidebar";
function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total Requests</h3>
            <p>24</p>
          </div>

          <div className="card">
            <h3>Approved</h3>
            <p>14</p>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <p>7</p>
          </div>

          <div className="card">
            <h3>Rejected</h3>
            <p>3</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
