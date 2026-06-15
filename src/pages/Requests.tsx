import { useState } from "react";

type RequestStatus = "Pending" | "Approved" | "Rejected";

type FinancialRequest = {
  id: number;
  applicantName: string;
  type: string;
  amount: number;
  status: RequestStatus;
  date: string;
};

const initialRequests: FinancialRequest[] = [
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
  const [requests, setRequests] = useState<FinancialRequest[]>(initialRequests);

  const [applicantName, setApplicantName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddRequest = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRequest: FinancialRequest = {
      id: requests.length + 1,
      applicantName,
      type: requestType,
      amount: Number(amount),
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setRequests([...requests, newRequest]);

    setApplicantName("");
    setRequestType("");
    setAmount("");
  };

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

        <div className="form-card">
          <h2>Add New Request</h2>

          <form onSubmit={handleAddRequest} className="request-form">
            <input
              type="text"
              placeholder="Applicant name"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Request type"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button type="submit">Add Request</button>
          </form>
        </div>

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
              {requests.map((request) => (
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
