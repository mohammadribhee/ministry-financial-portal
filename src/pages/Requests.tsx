type RequestStatus = "Pending" | "Approved" | "Rejected";

type FinancialRequest = {
  id: number;
  applicantName: string;
  type: string;
  amount: number;
  status: RequestStatus;
  date: string;
};

const mockRequests: FinancialRequest[] = [
  {
    id: 1,
    applicantName: "Ahmad Saleh",
    type: "Budget Approval",
    amount: 2500,
    status: "Pending",
    date: "2026-06-14",
  },
  {
    id: 2,
    applicantName: "Sara Ali",
    type: "Payment Request",
    amount: 1200,
    status: "Approved",
    date: "2026-06-12",
  },
  {
    id: 3,
    applicantName: "Omar Khaled",
    type: "Refund Request",
    amount: 800,
    status: "Rejected",
    date: "2026-06-10",
  },
];

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

        <div className="table-card">
          <h2>Financial Requests</h2>

          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Applicant</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {mockRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.applicantName}</td>
                  <td>{request.type}</td>
                  <td>${request.amount}</td>
                  <td>
                    <span className={`status ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Requests;
