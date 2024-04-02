import express from "express";
import {lines} from "../data";
import {getRoute} from "../domain/getRoute";
import {validateRouteQuery} from "../domain/middleware/validateRouteQuery";

const router = express.Router();

router.get(
  "/",
  validateRouteQuery,
  /**
   * example http://localhost:8080/routes?from=Warschauer Straße&to=Hausvogteiplatz
   * returns a structure like e.g.
   * ```json
   * [{
   *   "action": "enter",
   *   "station": "Otisstraße",
   *   "line": (U9)
   * }, {
   *   "action": "switch",
   *   "station": "Leopoldplatz",
   *   "line": (U9)
   *  },
   * {
   *   "action": "exit",
   *   "station": "Hansaplatz",
   *   "line": (U9)
   *  }]
   * ```
   */
  async function getRouteFuc(req, res) {
    const {from, to} = req.query;
    try {
      const route = await getRoute(from!.toString(), to!.toString(), lines);
      if (route.length === 0) {
        return res
          .status(404)
          .send({error: "No route found between the specified stations."});
      }
      res.json(route);
    } catch (error) {
      console.error("Failed to find route:", error);
      res
        .status(500)
        .send({error: "Failed to find the route due to an internal error."});
    }
  }
);
export const routeRoutes = router;
