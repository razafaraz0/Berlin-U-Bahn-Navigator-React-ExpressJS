import {useEffect, useState} from "react";
import "./App.css";
import {Line} from "./types/Line";
import {LineSelector} from "./components/LineSelector/LineSelector";
import {StationList} from "./components/StationList/StationList";
import {fetchLines} from "./hooks/getLines";
import {fetchStations} from "./hooks/getStations";
import {getNextStationFromCurrentStation} from "./hooks/getNextStationFromCurrentStation";
import {getAccessibleLines} from "./hooks/getAccessibleLines";
import StationDetails from "./components/StationDetails/StationDetails";
import {Box} from "@mui/material";

// TODO
//5. Fix height

function App() {
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<string>("");
  const [stationList, setStationList] = useState<string[]>([]);
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [accessibleLinesFromStation, setAccessibleLinesFromStation] = useState<
    Line[]
  >([]);
  const [nextStops, setNextStops] = useState<string[]>([]);

  useEffect(() => {
    fetchLines().then((lines) => setLines(lines));
  }, []);

  const handleOnLineSelect = (lineName: string) => {
    fetchStations(lineName).then((stations) => {
      setStationList(stations);
      setCurrentLine(lineName);
      setSelectedStation("");
      setAccessibleLinesFromStation([]);
      setNextStops([]);
    });
  };

  const handleOnStationSelect = (
    selectedLine: string,
    selectedStation: string
  ) => {
    if (selectedLine) {
      getNextStationFromCurrentStation({selectedLine, selectedStation}).then(
        (response) => {
          const {nextStops} = response;
          setNextStops(nextStops);
        }
      );
      getAccessibleLines({selectedLine, selectedStation}).then((response) => {
        const {accessibleLines} = response;
        setAccessibleLinesFromStation(accessibleLines);
      });
      setSelectedStation(selectedStation);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <LineSelector
          allLines={lines}
          onSelectLine={(val) => {
            handleOnLineSelect(val.name);
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Stack vertically on smaller screens
            "@media (min-width: 800px)": {
              // Use media queries for responsiveness
              flexDirection: "row", // Place side by side on larger screens
            },
            gap: 20,
            mt: 5,
          }}
        >
          <Box sx={{flex: 1, width: 250}}>
            {/* Each takes equal space */}
            {stationList && currentLine && (
              <StationList
                stations={stationList}
                onSelectStation={(station) =>
                  handleOnStationSelect(currentLine, station)
                }
              />
            )}
          </Box>
          <Box sx={{flex: 1, width: 250}}>
            {selectedStation &&
              accessibleLinesFromStation !== undefined &&
              nextStops !== undefined && (
                <StationDetails
                  accessibleLines={accessibleLinesFromStation}
                  nextStops={nextStops}
                />
              )}
          </Box>
        </Box>
      </header>
    </div>
  );
}

export default App;
