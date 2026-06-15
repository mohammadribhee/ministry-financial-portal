import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute", () => {
  test("renders children when user is authenticated", () => {
    localStorage.setItem("isAuthenticated", "true");

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <h1>Dashboard Page</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
  });

  test("redirects to login when user is not authenticated", () => {
    localStorage.removeItem("isAuthenticated");

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/" element={<h1>Login Page</h1>} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <h1>Dashboard Page</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});
