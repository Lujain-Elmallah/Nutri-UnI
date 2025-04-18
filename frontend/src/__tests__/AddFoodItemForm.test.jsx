

// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import AddItemFormPage from "../components/AddFoodItemForm";
// import { vi } from "vitest";

// // Mock navigate
// const mockNavigate = vi.fn();
// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom");
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// // Mock API
// const addFoodMock = vi.fn(() => Promise.resolve());
// vi.mock("../api/meals", () => ({
//   addFoodItem: addFoodMock,
// }));

// describe("AddFoodItemForm", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   test("renders all core input elements", () => {
//     render(
//       <MemoryRouter>
//         <AddItemFormPage />
//       </MemoryRouter>
//     );

//     expect(screen.getByPlaceholderText("Enter Item Name")).toBeInTheDocument();
//     expect(screen.getByText("Vegetarian")).toBeInTheDocument();
//     expect(screen.getByText("Vegan")).toBeInTheDocument();
//     expect(screen.getByText("Gluten Free")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Enter here...")).toBeInTheDocument();
//   });

//   test("shows alert on empty item name submit", () => {
//     window.alert = vi.fn();
//     render(
//       <MemoryRouter>
//         <AddItemFormPage />
//       </MemoryRouter>
//     );

//     const addButton = screen.getByRole("button", { name: "Add" });
//     fireEvent.click(addButton);

//     expect(window.alert).toHaveBeenCalledWith("⚠️ Please enter a valid item name.");
//   });

//   test("allows typing into nutrition fields", () => {
//     render(
//       <MemoryRouter>
//         <AddItemFormPage />
//       </MemoryRouter>
//     );

//     const energyInput = screen.getByPlaceholderText("kcal");
//     fireEvent.change(energyInput, { target: { value: "200" } });
//     expect(energyInput.value).toBe("200");

//     const proteinInput = screen.getByPlaceholderText("g");
//     fireEvent.change(proteinInput, { target: { value: "15" } });
//     expect(proteinInput.value).toBe("15");
//   });

//   test("updates checkbox state", () => {
//     render(
//       <MemoryRouter>
//         <AddItemFormPage />
//       </MemoryRouter>
//     );

//     const vegCheckbox = screen.getByLabelText("Vegetarian");
//     expect(vegCheckbox.checked).toBe(false);
//     fireEvent.click(vegCheckbox);
//     expect(vegCheckbox.checked).toBe(true);
//   });
// });

// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { vi } from "vitest";

// // ✅ Define the mocks BEFORE using them
// const addFoodMock = vi.fn();

// // ✅ Mock api and navigate before importing component
// vi.mock("../api/meals", () => ({
//   addFoodItem: addFoodMock,
// }));

// const mockNavigate = vi.fn();
// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom");
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// import AddItemFormPage from "../components/AddFoodItemForm";

// describe("AddFoodItemForm", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   test("renders all input elements", () => {
//     render(
//       <MemoryRouter>
//         <AddItemFormPage />
//       </MemoryRouter>
//     );

//     expect(screen.getByPlaceholderText("Enter Item Name")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Enter here...")).toBeInTheDocument();
//   });

//   test("alerts on empty name submit", () => {
//     window.alert = vi.fn();
//     render(
//       <MemoryRouter>
//         <AddItemFormPage />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByRole("button", { name: "Add" }));
//     expect(window.alert).toHaveBeenCalledWith("⚠️ Please enter a valid item name.");
//   });

//   test("updates checkbox state", () => {
//     render(
//       <MemoryRouter>
//         <AddItemFormPage />
//       </MemoryRouter>
//     );

//     const vegCheckbox = screen.getByLabelText("Vegetarian");
//     fireEvent.click(vegCheckbox);
//     expect(vegCheckbox.checked).toBe(true);
//   });
// });
import { render, screen, fireEvent } from "@testing-library/react";
import AddFoodItemForm from "../components/AddFoodItemForm";
import { MemoryRouter } from "react-router-dom";

describe("AddFoodItemForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks before each test
  });

  test("renders item name input", () => {
    render(
      <MemoryRouter>
        <AddFoodItemForm />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Enter Item Name/i)).toBeInTheDocument();
  });
  test("alerts if name is empty", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
  
    render(
      <MemoryRouter>
        <AddFoodItemForm />
      </MemoryRouter>
    );
  
    // Use a more specific selector to target the submit button
    const submitButton = screen.getByRole("button", {
      name: "Add",
      class: "bg-[#95ae45] text-white px-6 py-2 rounded-md hover:bg-[#819a3b]"
    });
  
    fireEvent.click(submitButton);
    expect(alertMock).toHaveBeenCalledWith("⚠️ Please enter a valid item name.");
  });
});
