import { useEffect, useState } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState();
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const key = process.env.REACT_APP_WEATHER_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const call = city;
    const a = await axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + call
      )
      .then((respone) => {
        if (respone.status == 200) {
          setLocation(respone.data.location.name);
          setTemp(respone.data.current.temp_c);
          setVisible(true);
          setError(false);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            console.error("Bad Request: Invalid input.");
            setError(true);
          } else {
            console.error(
              "Error:",
              error.response?.status,
              error.response?.data
            );
          }
        } else {
          console.error("Unexpected error:", error);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Weather</label>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          required
        ></input>
        <button>Submit</button>
        <br></br>
      </form>
      {visible && (
        <label className="temp-label">
          The temperature in {location} is {temp} celsius
        </label>
      )}
      {error && <label> The city does not exist</label>}
    </div>
  );
};
export default WeatherForm;
