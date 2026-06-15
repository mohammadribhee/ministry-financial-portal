import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Requests from "./Requests";
import userEvent from "@testing-library/user-event";

describe("Requests Page", () => {
  test("renders initial financial requests", () => {
    render(
      <MemoryRouter>
        <Requests />
      </MemoryRouter>,
    );

    expect(screen.getByText(/ahmad saleh/i)).toBeInTheDocument();
    expect(screen.getByText(/sara ali/i)).toBeInTheDocument();
    expect(screen.getByText(/omar khaled/i)).toBeInTheDocument();

    expect(screen.getByText(/budget approval/i)).toBeInTheDocument();
    expect(screen.getByText(/payment request/i)).toBeInTheDocument();
    expect(screen.getByText(/refund request/i)).toBeInTheDocument();
  });

  test("filters requests by applicant name", async () => {
    render(
      <MemoryRouter>
        <Requests />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const searchInput = screen.getByPlaceholderText(
      /search by applicant name/i,
    );

    await user.type(searchInput, "Sara");

    expect(screen.getByText(/sara ali/i)).toBeInTheDocument();

    expect(screen.queryByText(/ahmad saleh/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/omar khaled/i)).not.toBeInTheDocument();
  });

  test("filters requests by status", async () => {
    render(
      <MemoryRouter>
        <Requests />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const statusSelect = screen.getByRole("combobox");

    await user.selectOptions(statusSelect, "Approved");

    expect(screen.getByText(/sara ali/i)).toBeInTheDocument();

    expect(screen.queryByText(/ahmad saleh/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/omar khaled/i)).not.toBeInTheDocument();
  });

  test("adds a new request", async () => {
    render(
      <MemoryRouter>
        <Requests />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/^Applicant name$/i),
      "Mohammad Mansour",
    );
    await user.type(
      screen.getByPlaceholderText(/request type/i),
      "Travel Expense",
    );
    await user.type(screen.getByPlaceholderText(/amount/i), "1500");

    await user.click(screen.getByRole("button", { name: /add request/i }));

    expect(screen.getByText(/mohammad mansour/i)).toBeInTheDocument();
    expect(screen.getByText(/travel expense/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1500/i)).toBeInTheDocument();
    expect(screen.getAllByText(/pending/i).length).toBeGreaterThan(0);
  });
});
