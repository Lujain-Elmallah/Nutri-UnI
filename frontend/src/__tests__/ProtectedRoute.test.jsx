import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { MemoryRouter } from "react-router-dom";

vi.mock("@clerk/clerk-react", async () => {
    const actual = await vi.importActual("@clerk/clerk-react");
    return {
      ...actual,
      useUser: () => ({
        user: {
          fullName: "John Doe",
          publicMetadata: { role: "student" },
        },
        isLoaded: true,
      }),
    };
  });
  
test("renders children when allowed", () => {
  render(
    <MemoryRouter>
      <ProtectedRoute roleRequired={["student"]}>
        <div>Protected Content</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
  expect(screen.getByText("Protected Content")).toBeInTheDocument();
});
