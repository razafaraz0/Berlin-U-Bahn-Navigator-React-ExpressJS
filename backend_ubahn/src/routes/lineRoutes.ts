import express from "express";
import {lines} from "../data";
import {getStationsByLine} from "../domain/getStationsByLine";
import {getNextStops} from "../domain/getNextStops";
import {Direction} from "../domain/types/Direction";
import {getAccessibleLines} from "../domain/getAccessibleLines";
import {lineExists} from "../domain/middleware/lineExist";

const router = express.Router();

router.get(
  "/",
  /**
   * returns an array of line information from the route "/"":
   *
   * ```json
   * {
   *  "name": "string";
   *  "color": "string";
   * }
   * ```
   */
  async function getAllLines(req, res) {
    const responseItems = lines.map((line) => ({
      name: line.name,
      color: line.color,
    }));
    res.send(responseItems);
  }
);

router.get(
  "/:id",
  lineExists,
  /**
   * returns a specific line by id, e.g. `GET /lines/U8`
   */
  async (req, res) => {
    try {
      res.json(req.line);
    } catch (error) {
      res
        .status(500)
        .json({message: "Failed to get next stops due to an internal error."});
    }
  }
);

router.get(
  "/:id/stations",
  lineExists,
  /**
   * Q1: returns a list of all stations by Line, e.g. `GET /lines/U8/stations`
   */
  async (req, res) => {
    const requestedLineName = req.params.id;
    const stations = getStationsByLine(requestedLineName, lines);
    res.json(stations);
  }
);

router.get(
  "/:id/stations/:stationName/nextStations",
  lineExists,
  /**
   * Q2: returns a list of next N stations in that line Line, e.g. `GET /lines/U8/stations/Quermatengraben/nextStations?nStops=10`
   */
  async (req, res) => {
    const {stationName} = req.params;
    const {nStops = "3", direction = "forward"} = req.query;

    const stopsCount = parseInt(nStops as string, 10);
    const validDirection =
      direction === Direction.Backward ? Direction.Backward : Direction.Forward;

    try {
      if (req.line) {
        const nextStops = getNextStops(
          req.line,
          validDirection,
          stopsCount,
          stationName
        );
        res.json({nextStops});
      }
    } catch (error) {
      res
        .status(500)
        .json({message: "Failed to get next stops due to an internal error."});
    }
  }
);

router.get(
  "/:id/stations/:stationName/accessibleLines",
  lineExists,
  /**
   * Q3: returns a list of the lines served by the next stations e.g. `GET /lines/U1/stations/Gleisdreieck/accessibleLines`
   */
  (req, res) => {
    try {
      const {stationName} = req.params;
      if (req.line) {
        const accessibleLines = getAccessibleLines(
          req.line,
          stationName,
          lines
        );
        res.json({accessibleLines});
      }
    } catch (error) {
      res
        .status(500)
        .json({message: "Failed to get next stops due to an internal error."});
    }
  }
);

export const lineRoutes = router;
