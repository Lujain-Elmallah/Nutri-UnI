
// import { render, screen, fireEvent } from "@testing-library/react";
// import MenuTable from "../components/MenuTable";

// describe("MenuTable Component", () => {
//   const refreshMock = () => {};

//   const mockMenuItems = [
//     {
//       id: 1,
//       dining_hall: "D1",
//       counter: "Grill",
//       food_info: {
//         item_name: "Paneer Tikka",
//         item_photo_link: "https://example.com/paneer.jpg",
//       },
//     },
//   ];

//   test("renders menu items correctly", () => {
//     render(<MenuTable menuItems={mockMenuItems} loading={false} refresh={refreshMock} />);
//     expect(screen.getByText("Paneer Tikka")).toBeInTheDocument();
//   });

//   test("renders fallback when no menu items", () => {
//     render(<MenuTable menuItems={[]} loading={false} refresh={refreshMock} />);
//     expect(screen.getByText("No menu items found.")).toBeInTheDocument();
//   });
// });

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import MenuTable from "../components/MenuTable";
import { deleteMenuItem, updateMenuItem } from "../api/meals";

// Mock the API functions
vi.mock("../api/meals", () => ({
  deleteMenuItem: vi.fn(),
  updateMenuItem: vi.fn()
}));
describe("MenuTable Component", () => {
    const refreshMock = vi.fn();
    const mockAlert = vi.fn();
    window.alert = mockAlert;
  
    const mockMenuItems = [
      {
        id: 1,
        dining_hall: "D1",
        counter: "Grill",
        food_info: {
          item_name: "Paneer Tikka",
          item_photo_link: "https://example.com/paneer.jpg",
        },
      },
      {
        id: 2,
        dining_hall: "D2",
        counter: "Pasta",
        food_info: {
          item_name: "Spaghetti",
        },
      }
    ];
  
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    test("renders menu items correctly", () => {
      render(<MenuTable menuItems={mockMenuItems} loading={false} refresh={refreshMock} />);
      expect(screen.getByText("Paneer Tikka")).toBeInTheDocument();
      expect(screen.getByText("Spaghetti")).toBeInTheDocument();
    });
  
    test("renders loading state", () => {
      render(<MenuTable menuItems={[]} loading={true} refresh={refreshMock} />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  
    test("renders fallback when no menu items", () => {
      render(<MenuTable menuItems={[]} loading={false} refresh={refreshMock} />);
      expect(screen.getByText("No menu items found.")).toBeInTheDocument();
    });
  
    test("handles edit mode correctly", () => {
      render(<MenuTable menuItems={mockMenuItems} loading={false} refresh={refreshMock} />);
      const editButtons = screen.getAllByRole("button", { name: /edit/i });
      fireEvent.click(editButtons[0]);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(2);
    });
  
    test("handles save successfully", async () => {
      updateMenuItem.mockResolvedValueOnce({});
      render(<MenuTable menuItems={mockMenuItems} loading={false} refresh={refreshMock} />);
      const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
      fireEvent.click(editButton);
      const saveButton = screen.getByRole("button", { name: /save/i });
      fireEvent.click(saveButton);
      await waitFor(() => {
        expect(refreshMock).toHaveBeenCalled();
      });
    });
  
    test("handles save error", async () => {
      updateMenuItem.mockRejectedValueOnce(new Error("Update failed"));
      render(<MenuTable menuItems={mockMenuItems} loading={false} refresh={refreshMock} />);
      const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
      fireEvent.click(editButton);
      const saveButton = screen.getByRole("button", { name: /save/i });
      fireEvent.click(saveButton);
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("Error updating item.");
      });
    });
  
    test("handles delete successfully", async () => {
      deleteMenuItem.mockResolvedValueOnce({});
      window.confirm = vi.fn(() => true);
      render(<MenuTable menuItems={mockMenuItems} loading={false} refresh={refreshMock} />);
      const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
      fireEvent.click(deleteButton);
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("Deleted!");
        expect(refreshMock).toHaveBeenCalled();
      });
    });
  
    test("handles delete error", async () => {
      deleteMenuItem.mockRejectedValueOnce(new Error("Delete failed"));
      window.confirm = vi.fn(() => true);
      render(<MenuTable menuItems={mockMenuItems} loading={false} refresh={refreshMock} />);
      const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
      fireEvent.click(deleteButton);
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("Error deleting item.");
      });
    });
  });