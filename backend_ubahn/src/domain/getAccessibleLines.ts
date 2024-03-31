import {Line} from "./types/Line";

/**
 *Q3 given a line and a station that are passed with a GET request, which other lines are accessible at that station?
 *
 * @returns all lines that are accessible on station `fromStation` in line `onLine`, except `onLine` itself
 */

export function getAccessibleLines(
  onLine: Line,
  fromStation: string,
  allLines: Line[]
): Line[] {
  // Check if the given station is on the provided line
  if (!onLine.stations.includes(fromStation)) {
    throw new Error(`Station ${fromStation} is not on line ${onLine.name}.`);
  }
  const accessibleLines = allLines.filter(
    (line) => line.name !== onLine.name && line.stations.includes(fromStation)
  );

  return accessibleLines;
}
