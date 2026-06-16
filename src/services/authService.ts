export type LoginResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
  };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
}

export async function refreshAccessToken() {
  const response = await fetch("http://localhost:5000/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to refresh token");
  }

  return response.json();
}