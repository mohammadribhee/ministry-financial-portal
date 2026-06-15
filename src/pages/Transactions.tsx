import Sidebar from "../components/Sidebar";
import "../styles/sidebar.css";
type TransactionStatus = "Completed" | "Pending" | "Failed";

type Transaction = {
  id: number;
  reference: string;
  beneficiary: string;
  amount: number;
  status: TransactionStatus;
  date: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    reference: "TRX-1001",
    beneficiary: "Ministry of Health",
    amount: 5200,
    status: "Completed",
    date: "2026-06-14",
  },
  {
    id: 2,
    reference: "TRX-1002",
    beneficiary: "Education Department",
    amount: 3100,
    status: "Pending",
    date: "2026-06-13",
  },
  {
    id: 3,
    reference: "TRX-1003",
    beneficiary: "Public Services",
    amount: 900,
    status: "Failed",
    date: "2026-06-11",
  },
];

function Transactions() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Transactions</h1>
        </header>

        <div className="table-card">
          <h2>Financial Transactions</h2>

          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Reference</th>
                <th>Beneficiary</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.reference}</td>
                  <td>{transaction.beneficiary}</td>
                  <td>${transaction.amount}</td>
                  <td>
                    <span
                      className={`status ${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Transactions;
