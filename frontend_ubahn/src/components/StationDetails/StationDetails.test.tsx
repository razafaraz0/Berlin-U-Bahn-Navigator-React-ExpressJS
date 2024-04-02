import {render, screen} from "@testing-library/react";
import StationDetails from "./StationDetails";
import {Line} from "../../types/Line";

describe("StationDetails", () => {
  const mockAccessibleLines: Line[] = [
    {
      name: "Line 1",
      color: "#FF0000",
      type: "linear",
      stations: ["Station A", "Station B"],
    },
    {
      name: "Line 2",
      color: "#00FF00",
      type: "linear",
      stations: ["Station C", "Station D"],
    },
  ];

  const mockNextStops = ["Stop 1", "Stop 2", "Stop 3"];

  it('displays "No Other Line" when there are no accessible lines', () => {
    render(<StationDetails accessibleLines={[]} nextStops={mockNextStops} />);
    expect(screen.getByText("No Other Line")).toBeInTheDocument();
  });

  it("renders LineSelector when there are accessible lines", () => {
    render(
      <StationDetails accessibleLines={mockAccessibleLines} nextStops={[]} />
    );
    expect(screen.getByTestId("line-selector")).toBeInTheDocument();
    expect(screen.getByTestId("line-selector")).toHaveTextContent(
      "Line 1, Line 2"
    );
  });

  it('displays "No Other Line" under "Station List" when there are no next stops', () => {
    render(
      <StationDetails accessibleLines={mockAccessibleLines} nextStops={[]} />
    );
    expect(screen.getByText("Station List")).toBeInTheDocument();
    expect(screen.getAllByText("No Other Line").length).toBe(2); // Ensure it's displayed in both sections
  });

  it("renders StationList when there are next stops", () => {
    render(<StationDetails accessibleLines={[]} nextStops={mockNextStops} />);
    expect(screen.getByTestId("station-list")).toBeInTheDocument();
    expect(screen.getByTestId("station-list")).toHaveTextContent(
      "Stop 1, Stop 2, Stop 3"
    );
  });
});
