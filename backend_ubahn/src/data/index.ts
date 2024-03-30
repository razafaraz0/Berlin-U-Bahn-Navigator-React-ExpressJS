/**
 * Contains the read raw data from `lines.json`.
 */

import {Line} from "../domain/types/Line";

export const lines = require("./lines.json") as Line[];
