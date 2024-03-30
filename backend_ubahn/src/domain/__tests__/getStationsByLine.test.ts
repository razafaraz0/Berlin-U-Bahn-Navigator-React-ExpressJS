import {getStationsByLine} from "../getStationsByLine";
import {Line} from "../types/Line";
import {LineType} from "../types/LineType";

// Define dummy data
const line1: Line = {
  name: "U1",
  color: "#ff0000",
  type: LineType.Linear,
  stations: ["Station1", "Station2", "Station3"],
};

const line2: Line = {
  name: "U2",
  color: "#ff00ff",
  type: LineType.Linear,
  stations: ["Station3", "Station4", "Station5"],
};

const allLines = [line1, line2];
// Test to verify correct stations are returned for a given line
describe("Get Station by Line", () => {
  it("returns correct stations for a given line", () => {
    const result = getStationsByLine("U1", allLines); // Assuming getStationsByLine expects a line name and array of lines
    expect(result).toStrictEqual(["Station1", "Station2", "Station3"]);
  });

  // Test to verify that an undefined or null is returned when the line does not exist
  it("returns undefined for a non-existent line", () => {
    const result = getStationsByLine("U3", allLines); // Non-existent line
    expect(result).toBeUndefined(); // Assuming the function returns undefined for non-existent lines
  });
});
