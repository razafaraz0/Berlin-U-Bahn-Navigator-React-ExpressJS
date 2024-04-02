import {Direction} from "./types/Direction";
import {Line} from "./types/Line";

/**
 * Q2. Given a line that is passed with a GET request and a station belonging to the line,
 *     what are the next N stops relative to the passed station?
 *          ->a value for N can be passed optionally via the route. Default: 3
 *          ->a value for the direction can be optionally passed via the route. See src/domain/getNextStops.ts. Default: forward
 * Computes which stations of a given line follow next after a given station
 *
 * @returns the next `nStops` stations of `line`, counting from `fromStation` and in direction `direction`
 */

export function getNextStops(
  line: Line,
  /**
   * if `forward`, returns the stations that follow `fromStation` in the `line.stations` array.
   *
   * if `backward`, returns the stations that precede `fromStation` in the `line.stations` array.
   */
  direction: Direction = Direction.Forward,
  /**
   * the maximum number of stops that should be returned
   */
  nStops: number = 3,
  /**
   * which station within `line` to base the computation on
   */
  fromStation: string
): string[] {
  const startStationIndex = line.stations.indexOf(fromStation);
  const stations = line.stations;
  //That station doesn't exist
  if (startStationIndex === -1 || stations === undefined) {
    throw new Error(
      `Station ${fromStation} does not exist found on Line ${line.name}.`
    );
  }

  if (direction === Direction.Forward) {
    const endIndex = startStationIndex + 1 + nStops;
    return stations.slice(startStationIndex + 1, endIndex);
  }
  if (direction === Direction.Backward) {
    // to prevent to go have out of bound negative index
    const endIndex = Math.max(0, startStationIndex - nStops);
    return stations.slice(endIndex, startStationIndex).reverse();
  }

  return [];
}
