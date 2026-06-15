import Sidebar from "../components/Sidebar";
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Transactions
          </h1>
        </header>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Financial Transactions
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    ID
                  </th>

                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    Reference
                  </th>

                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    Beneficiary
                  </th>

                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    Amount
                  </th>

                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    Status
                  </th>

                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="border-b p-4 text-gray-500">
                      {transaction.id}
                    </td>

                    <td className="border-b p-4 text-gray-500">
                      {transaction.reference}
                    </td>

                    <td className="border-b p-4 text-gray-500">
                      {transaction.beneficiary}
                    </td>

                    <td className="border-b p-4 text-gray-500">
                      ${transaction.amount}
                    </td>

                    <td className="border-b p-4 text-gray-500">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="border-b p-4 text-gray-500">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Transactions;
