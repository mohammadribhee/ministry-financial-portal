import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Dashboard
          </h1>
          <button
            className="w-fit rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <h3 className="mb-3 text-xl font-bold text-gray-600">
              Total Requests
            </h3>
            <p className="text-4xl font-bold text-blue-800">24</p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <h3 className="mb-3 text-xl font-bold text-gray-600">Approved</h3>
            <p className="text-4xl font-bold text-blue-800">14</p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <h3 className="mb-3 text-xl font-bold text-gray-600">Pending</h3>
            <p className="text-4xl font-bold text-blue-800">7</p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <h3 className="mb-3 text-xl font-bold text-gray-600">Rejected</h3>
            <p className="text-4xl font-bold text-blue-800">3</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
