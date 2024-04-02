import axios from "axios";

export async function fetchStations(selectedLine: string) {
  const response = await axios.get(
    `http://localhost:8080/lines/${selectedLine}/stations`
  );
  return response.data;
}
