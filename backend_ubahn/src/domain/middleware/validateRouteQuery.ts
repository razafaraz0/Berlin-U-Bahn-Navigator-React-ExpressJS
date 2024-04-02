import {Request, Response, NextFunction} from "express";

export const validateRouteQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {from, to} = req.query;
  if (!from || !to) {
    return res
      .status(400)
      .json({error: "Both 'from' and 'to' query parameters are required."});
  }
  next();
};
