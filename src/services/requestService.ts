import api from "./api";

export type RequestStatus = "Pending" | "Approved" | "Rejected";

export type FinancialRequest = {
  id: number;
  applicantName: string;
  type: string;
  amount: number;
  status: RequestStatus;
  date: string;
};

export type CreateRequestInput = {
  applicantName: string;
  type: string;
  amount: number;
};

export async function getRequests(
  accessToken: string,
): Promise<FinancialRequest[]> {
  const response = await api.get<FinancialRequest[]>("/api/requests", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function createRequest(
  accessToken: string,
  data: CreateRequestInput,
): Promise<FinancialRequest> {
  const response = await api.post<FinancialRequest>("/api/requests", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}