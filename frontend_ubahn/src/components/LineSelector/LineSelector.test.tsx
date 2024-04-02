// Import necessary libraries and components
import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {LineSelector} from "./LineSelector"; // Adjust the import path as necessary
import {Line} from "../../types/Line";

// Define mock data for testing
const mockLines: Line[] = [
  {
    name: "Line 1",
    color: "#7DAD4A",
    type: "linear",
    stations: [
      "Warschauer Straße",
      "Schlesisches Tor",
      "Görlitzer Bahnhof",
      "Kottbusser Tor",
    ],
  },
  {
    name: "Line 2",
    color: "#DB4018",
    type: "linear",
    stations: [
      "Warschauer Straße",
      "Schlesisches Tor",
      "Görlitzer Bahnhof",
      "Kottbusser Tor",
    ],
  },
  {
    name: "Line 3",
    color: "#0000FF",
    type: "linear",
    stations: [
      "Warschauer Straße",
      "Schlesisches Tor",
      "Görlitzer Bahnhof",
      "Kottbusser Tor",
    ],
  },
];

// Mock onSelectLine function
const mockOnSelectLine = jest.fn();

describe("LineSelector Component", () => {
  it("displays all lines", () => {
    render(
      <LineSelector allLines={mockLines} onSelectLine={mockOnSelectLine} />
    );
    // Check if all lines are displayed with correct name
    mockLines.forEach((line) => {
      expect(screen.getByText(line.name)).toBeInTheDocument();
    });
  });

  it("calls onSelectLine with the correct line when a line is clicked", () => {
    render(
      <LineSelector allLines={mockLines} onSelectLine={mockOnSelectLine} />
    );
    // Simulate click on the first line button
    fireEvent.click(screen.getByText(mockLines[0].name));
    // Verify the onSelectLine function was called with the correct line object
    expect(mockOnSelectLine).toHaveBeenCalledWith(mockLines[0]);
  });
});
