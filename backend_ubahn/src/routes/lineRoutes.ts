import express from "express";
import {lines} from "../data";
import {getStationsByLine} from "../domain/getStationsByLine";

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

// router.get(
//   "/:id",
//   /**
//    * returns a specific line by id, e.g. `GET /lines/U8`
//    */
//   async function getLineById(req, res) {
//     // find the specific line by key
//     const requestedLineId = req.params.id;

//     const requestedLine = lines.find((line) => line.name === requestedLineId);
//     if (!requestedLine) {
//       res.sendStatus(404);
//       return;
//     }

//     res.send(requestedLine);
//   }
// );

// TODO: add further routes here
router.get(
  "/:id/stations",
  /**
   * returns a list of stations by Line, e.g. `GET /lines/U8`
   */
  async function getStationsById(req, res) {
    const requestedLineName = req.params.id;

    // Use the `getStationsByLine` function to get the stations.
    // This function expects a string (line name) and returns an array of station names or null
    const stations = getStationsByLine(requestedLineName, lines);

    if (!stations) {
      // If no stations are returned, it means the line was not found
      res
        .status(404)
        .send({message: `Line ${requestedLineName} does not exist found.`});
      return;
    }

    // Send the stations array as response
    res.json(stations);
  }
);

export const lineRoutes = router;
