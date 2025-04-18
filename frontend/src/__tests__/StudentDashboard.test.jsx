import { render, screen } from "@testing-library/react";
import StudentDashboard from "../pages/StudentDashboard";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import { vi } from "vitest";

// Mock Clerk
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

// Mock API
vi.mock("../api/meals", () => ({
  getWeekMenu: () => Promise.resolve({
    data: [
      {
        id: "1",
        dining_hall: "D1",
        counter: "Mongolian",
        food_info: {
          item_name: "Greek Salad",
          energy: 200,
          protein: 10,
          fats: 5,
          sugar: 3,
          salt: 1,
          allergens: ["nuts"],
          veg: true,
          vegan: false,
          gluten_free: true,
        },
      },
    ],
  }),
}));

test("renders greeting for student", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );
  });

  expect(screen.getByText((text) => text.includes("Hello"))).toBeInTheDocument();
});

test("displays dining halls with flexible matchers", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );
  });

  expect(await screen.findByText((t) => t.toLowerCase().includes("d1"))).toBeInTheDocument();
});

test("matches snapshot", async () => {
  let container;
  await act(async () => {
    const rendered = render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );
    container = rendered.container;
  });

  expect(container).toMatchSnapshot();
});

test("filters meals by counter when a counter is clicked", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <StudentDashboard />
        </MemoryRouter>
      );
    });
  
    // Step 1: Click "D1" to reveal its counters
    const d1Button = await screen.findByRole("button", { name: /d1/i });
    expect(d1Button).toBeInTheDocument();
  
    await act(async () => {
      d1Button.click();
    });
  
    // Step 2: Now "Mongolian" counter should be visible
    const counterButton = await screen.findByRole("button", { name: /mongolian/i });
    expect(counterButton).toBeInTheDocument();
  
    await act(async () => {
      counterButton.click();
    });
  
    // Step 3: Check if filtered meal is visible
    expect(await screen.findByText(/greek salad/i)).toBeInTheDocument();
  });
  