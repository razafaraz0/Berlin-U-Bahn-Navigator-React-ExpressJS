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
import {Typography} from "@mui/material";

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
      <Typography variant="h3">Berlin U-Bahn Information Center</Typography>
      <div className="LineSelector">
        <LineSelector
          allLines={lines}
          onSelectLine={(val) => {
            handleOnLineSelect(val.name);
          }}
        />
      </div>

      <div className="StationDetailContainer">
        <div className="StationDetailChildContainer">
          {/* Each takes equal space */}
          {stationList && currentLine && (
            <StationList
              stations={stationList}
              onSelectStation={(station) =>
                handleOnStationSelect(currentLine, station)
              }
            />
          )}
        </div>
        <div className="StationDetailChildContainer">
          {selectedStation &&
            accessibleLinesFromStation !== undefined &&
            nextStops !== undefined && (
              <StationDetails
                accessibleLines={accessibleLinesFromStation}
                nextStops={nextStops}
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
