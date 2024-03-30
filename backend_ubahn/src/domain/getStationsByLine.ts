import {Line} from "./types/Line";

export function getStationsByLine(
  requestedLineName: string,
  lines: Line[]
): string[] | undefined {
  const requestedLine = lines.find((line) => line.name === requestedLineName);
  if (requestedLine) {
    return requestedLine.stations;
  } else {
    return undefined;
  }
}
