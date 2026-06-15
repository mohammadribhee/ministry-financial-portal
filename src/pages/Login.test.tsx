import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import userEvent from "@testing-library/user-event";
describe("Login Page", () => {
  test("renders login form elements", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error when submitting empty form", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });

  test("shows error when password is too short", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "admin@gmail.com");
    await user.type(passwordInput, "123");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText(/password must be at least 6 characters/i),
    ).toBeInTheDocument();
  });

  test("logs in successfully with valid credentials", async () => {
    localStorage.clear();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "admin@gmail.com");
    await user.type(passwordInput, "123456");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(localStorage.getItem("isAuthenticated")).toBe("true");
  });

  test("shows error with wrong credentials", async () => {
    localStorage.clear();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "test@gmail.com");
    await user.type(screen.getByLabelText(/password/i), "123456");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    expect(localStorage.getItem("isAuthenticated")).toBeNull();
  });
});
