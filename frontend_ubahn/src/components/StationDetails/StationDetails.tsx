import {Line} from "../../types/Line";
import {StationList} from "../StationList/StationList";
import {LineSelector} from "../LineSelector/LineSelector";
import {Box, Paper, Typography} from "@mui/material";
import "./StationDetails.css";

type TProps = {
  accessibleLines: Line[];
  nextStops: string[];
};

export default function StationDetails({accessibleLines, nextStops}: TProps) {
  return (
    <Box>
      <Typography variant="h4" component="h4">
        Other Lines
      </Typography>
      {accessibleLines.length === 0 ? (
        <Paper className="stationDetailsPaper">
          <Typography variant="h5" component="h5">
            No Other Line
          </Typography>
        </Paper>
      ) : (
        <LineSelector allLines={accessibleLines} onSelectLine={() => {}} />
      )}
      <Box sx={{mt: 5}}>
        {nextStops.length === 0 ? (
          <Box>
            <Typography variant="h4" component="h4">
              Station List
            </Typography>
            <Paper className="stationDetailsPaper">
              <Typography variant="h5" component="h5">
                No Other Stations
              </Typography>
            </Paper>
          </Box>
        ) : (
          <StationList
            stations={nextStops}
            onSelectStation={() => {}}
            isClickDisabled={true}
          />
        )}
      </Box>
    </Box>
  );
}
