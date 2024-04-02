import {Box, Button, Paper, Typography} from "@mui/material";
import {Line} from "../../types/Line";
import "./LineSelector.css";

type LineSelectorProps = {
  allLines: Line[];
  onSelectLine: (line: Line) => void; // Function to handle line selection
};
export function LineSelector(props: LineSelectorProps) {
  return (
    <Box className="lineSelectorContainer">
      {props.allLines.map((line: Line) => {
        return (
          <Button
            key={line.name}
            size="large"
            onClick={() => props.onSelectLine(line)}
          >
            <Paper
              style={{
                padding: "20px",
                width: "100%",
                backgroundColor: line.color,
              }}
            >
              <Typography variant="h5" component="h5">
                {line.name}
              </Typography>
            </Paper>
          </Button>
        );
      })}
    </Box>
  );
}
