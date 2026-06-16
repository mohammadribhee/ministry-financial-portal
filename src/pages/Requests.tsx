import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest } from "../services/requestService";
import {
  getRequests,
  type FinancialRequest,
  type RequestStatus,
} from "../services/requestService";

function Requests() {
  const { accessToken } = useAuth();

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: () => getRequests(accessToken!),
    enabled: !!accessToken,
  });
  const queryClient = useQueryClient();
  const [applicantName, setApplicantName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [amount, setAmount] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | RequestStatus>(
    "All",
  );

  const createRequestMutation = useMutation({
    mutationFn: (data: {
      applicantName: string;
      type: string;
      amount: number;
    }) => createRequest(accessToken!, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });

  const handleAddRequest = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createRequestMutation.mutateAsync({
      applicantName,
      type: requestType,
      amount: Number(amount),
    });

    setApplicantName("");
    setRequestType("");
    setAmount("");
  };

  const filteredRequests = requests.filter((request: FinancialRequest) => {
    const matchesSearch = request.applicantName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return <p>Loading requests...</p>;
  }

  if (error) {
    return <p>Something went wrong while loading requests.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Requests
          </h1>
        </header>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
          <h2>Add New Request</h2>

          <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg md:flex-row">
            <input
              className="flex-1 rounded-lg border border-gray-300 p-3"
              type="text"
              placeholder="Search by applicant name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="rounded-lg border border-gray-300 p-3 md:w-48"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "All" | RequestStatus)
              }
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <form
            onSubmit={handleAddRequest}
            className="grid grid-cols-1 gap-4 md:grid-cols-4"
          >
            <input
              className="rounded-lg border border-gray-300 p-3"
              type="text"
              placeholder="Applicant name"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              required
            />

            <input
              className="rounded-lg border border-gray-300 p-3"
              type="text"
              placeholder="Request type"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              required
            />

            <input
              className="rounded-lg border border-gray-300 p-3"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-800 px-5 py-3 text-white hover:bg-blue-950"
            >
              Add Request
            </button>
          </form>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Financial Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    ID
                  </th>
                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    Applicant
                  </th>
                  <th className="border-b bg-gray-50 p-4 text-left text-gray-800">
                    Type
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
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="border-b p-4 text-gray-500">{request.id}</td>
                    <td className="border-b p-4 text-gray-500">
                      {request.applicantName}
                    </td>
                    <td className="border-b p-4 text-gray-500">
                      {request.type}
                    </td>
                    <td className="border-b p-4 text-gray-500">
                      ${request.amount}
                    </td>
                    <td className="border-b p-4 text-gray-500">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-bold ${
                          request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="border-b p-4 text-gray-500">
                      {request.date}
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

export default Requests;
