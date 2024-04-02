import axios from "axios";

type TProps = {
  selectedLine: string;
  selectedStation: string;
};
export async function getNextStationFromCurrentStation({
  selectedLine,
  selectedStation,
}: TProps) {
  const response = await axios.get(
    `http://localhost:8080/lines/${selectedLine}/stations/${selectedStation}/nextStations`
  );
  return response.data;
}
