import axios from "axios";

export async function fetchLines() {
  const response = await axios.get("http://localhost:8080/lines");

  return response.data;
}
