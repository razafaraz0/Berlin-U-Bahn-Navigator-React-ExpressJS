type LineType = "linear";

export interface Line {
  name: string;
  color: string;
  type: LineType;
  stations: string[];
}
