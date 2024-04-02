import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {StationList} from "./StationList";

describe("StationList Component", () => {
  // Mock data and functions
  const stations = ["Station 1", "Station 2", "Station 3"];
  const mockOnSelectStation = jest.fn();

  it("displays all stations", () => {
    render(
      <StationList stations={stations} onSelectStation={mockOnSelectStation} />
    );
    stations.forEach((station) => {
      expect(screen.getByText(station)).toBeInTheDocument();
    });
  });

  it("calls onSelectStation with the correct station when clicked", () => {
    render(
      <StationList stations={stations} onSelectStation={mockOnSelectStation} />
    );
    // Simulate click on the first station
    fireEvent.click(screen.getByText(stations[0]));
    // Verify the callback was called with the correct station name
    expect(mockOnSelectStation).toHaveBeenCalledWith(stations[0]);
  });
});
