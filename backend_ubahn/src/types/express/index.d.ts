import express from "express";
import {Line} from "../../domain/types/Line";

declare global {
  namespace Express {
    interface Request {
      line?: Line;
    }
  }
}
