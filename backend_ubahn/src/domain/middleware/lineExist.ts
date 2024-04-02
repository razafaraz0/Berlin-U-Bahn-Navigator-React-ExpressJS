import {Request, Response, NextFunction} from "express";
import {lines} from "../../data";
import {Line} from "../types/Line";

interface RequestWithLineRole extends Request {
  line?: Line;
}
export const lineExists = (
  req: RequestWithLineRole,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;
  const line = lines.find(({name}) => name === id);

  if (!line) {
    return res.status(404).json({message: `Line ${id} not found.`});
  }
  req.line = line; // Pass the line object to the next middleware/route handler

  next();
};
