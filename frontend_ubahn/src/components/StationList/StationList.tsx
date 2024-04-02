import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

type StationListProps = {
  stations: string[];
  onSelectStation: (station: string) => void;
  isClickDisabled?: boolean;
};

export function StationList(props: StationListProps) {
  return (
    <>
      <Typography variant="h4" component="h4">
        Station List
      </Typography>
      <Paper
        style={{
          width: "100%",
          maxWidth: 360,
          maxHeight: 400,
          overflowY: "auto", // This enables vertical scrolling
        }}
      >
        <List>
          {props.stations.map((station, index) => {
            return (
              <ListItemButton
                key={index}
                disabled={props.isClickDisabled}
                onClick={() => props.onSelectStation(station)}
              >
                <ListItemText primary={station} />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    </>
  );
}
