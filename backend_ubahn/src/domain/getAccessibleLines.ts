import {Line} from "./types/Line";

/**
 *Q 1. Given a line that is passed with a GET request, which stations are served by the line?
 * returns an array of `Line`s that are accessible from the station with name `fromStation`.
 *
 * @returns all lines that are accessible on station `fromStation` in line `onLine`, except `onLine` itself
 */

export function getAccessibleLines(
  onLine: Line,
  fromStation: string,
  allLines: Line[]
): Line[] {
  // TODO: implement
  throw new Error("not implemented");
}
