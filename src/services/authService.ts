import api from "./api";

export type User = {
  id: number;
  email: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export interface RefreshResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
  };
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function refreshAccessToken(): Promise<RefreshResponse> {
  const response = await api.post<RefreshResponse>("/api/auth/refresh");

  return response.data;
}

export async function logout(): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>("/api/auth/logout");

  return response.data;
}