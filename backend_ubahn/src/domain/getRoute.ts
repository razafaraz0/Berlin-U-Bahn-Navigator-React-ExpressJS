import {Line} from "./types/Line";

export type RouteSegment = {
  /**
   * `enter` = enter to `line` at this `station`
   *
   * `switch` = switch to `line` at this `station`
   *
   * `exit` = exit `line` at `station`
   */

  action: "enter" | "switch" | "exit";
  station: string;
  line: Line;
};

// // Helper function to build a route segment.
const buildSegment = (
  action: "enter" | "switch" | "exit",
  station: string,
  line: Line
): RouteSegment => ({
  action,
  station,
  line,
});

export type Route = RouteSegment[];

// /**
//  *Q4 given two stations, how can a passenger navigate from the first station to the second station?
//  *see the getRoute() function for further explanation and tests
//  *any valid route suffices, you don't need to optimize for distance etc.
//  *
//  * You can assume `allLines` to be the sample data included in this project, which means you can make the following assumptions:
//  *  - all stations are interconnected, so it should always be possible to find a valid Route.
//  *  - there's a finite set of stations with a size of around ~100
//  *
//  * @returns a structure like e.g.
//  * ```json
//  * [{
//  *   "action": "enter",
//  *   "station": "Otisstraße",
//  *   "line": (U9)
//  * }, {
//  *   "action": "switch",
//  *   "station": "Leopoldplatz",
//  *   "line": (U9)
//  *  },
//  *  {
//  *   "action": "switch",
//  *   "station": "Leopoldplatz2",
//  *   "line": (U9)
//  *  },
//  * {
//  *   "action": "exit",
//  *   "station": "Hansaplatz",
//  *   "line": (U9)
//  *  }]
//  * ```
//  */

function findDirectRoute(
  originStation: string,
  destinationStation: string,
  allLines: Line[]
): Route | null {
  for (const line of allLines) {
    if (
      line.stations.includes(originStation) &&
      line.stations.includes(destinationStation)
    ) {
      return [
        buildSegment("enter", originStation, line),
        buildSegment("exit", destinationStation, line),
      ];
    }
  }
  return null;
}

function buildStationToLinesMap(allLines: Line[]): Map<string, Line[]> {
  const map = new Map<string, Line[]>();
  allLines.forEach((line) => {
    line.stations.forEach((station) => {
      if (!map.has(station)) map.set(station, []);
      map.get(station)!.push(line);
    });
  });
  return map;
}

export function getRoute(
  originStation: string,
  destinationStation: string,
  allLines: Line[]
): Route {
  const directRoute = findDirectRoute(
    originStation,
    destinationStation,
    allLines
  );
  if (directRoute) return directRoute;

  //construct all the station to the lines
  const stationToLinesMap = buildStationToLinesMap(allLines);
  const visited = new Set<string>();

  const queue: Array<{station: string; route: Route}> = [
    {station: originStation, route: []},
  ];

  while (queue.length > 0) {
    const {station, route} = queue.shift()!;
    if (station === destinationStation) {
      return [
        ...route,
        buildSegment("exit", destinationStation, route[route.length - 1]?.line),
      ];
    }
    // Adds the current station to the visited set to prevent revisiting it in future iterations, optimizing the search process.
    visited.add(station);
    // Retrieves a list of lines that pass through the current station
    const currentLines = stationToLinesMap.get(station) || [];

    currentLines.forEach((line) => {
      line.stations.forEach((nextStation) => {
        if (!visited.has(nextStation)) {
          const action =
            route.length === 0
              ? "enter"
              : route[route.length - 1].line !== line // compare last route line with recent route segment added
              ? "switch"
              : null;
          const newRoute = action
            ? [...route, buildSegment(action, station, line)]
            : [...route];
          queue.push({station: nextStation, route: newRoute});
        }
      });
    });
  }

  throw new Error("No route found.");
}
