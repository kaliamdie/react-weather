import "./index.css"
import clear from "./images/clear.png"
import wind from "./images/wind.png"
import humidity from "./images/humidity.png"
import { useEffect, useState } from "react"
import icon from "./images/search.png"

function App() {
  const [input, setInput] = useState("");
  const [winds,setWinds]=useState("")
  const [name,setName]=useState("")
  const [humiditys,setHumiditys]=useState("")
  const apiKey = "fe78fc89d467e01c5c47ed0198e6d8e9";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;


  async function fetchData(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      const data = await response.json();

      // Check if the 'data' object and its properties exist
      if (data && data.main && data.main.humidity &&data.name && data.wind && data.wind.speed) {
        setHumiditys(data.main.humidity);
        setWinds(data.wind.speed);
        setName(data.name)
      } else {
        // Handle the case where data is incomplete or missing
        console.error("Weather data is incomplete.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    // Use the input state variable as the city value
    fetchData(input);
    handleClick(input)
  }, []); // Make input a dependency
function handleClick(city){
  fetchData(city);
}


  return (
    <div className="App">
      <h1>Welcome</h1>
      <div className="container">
        <div className="search">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter a city name"
          />
          <button onClick={()=>handleClick(input)}>
            <img src={icon} className="icon" />
          </button>
        </div>

        <div className="center">
          <img src={clear} />
          <p>11C</p>
          <p>{name}</p>
        </div>
        <div className="vertical">
          <div className="forecast">
            <div className="icons">
              <img className="humidity" src={humidity} alt="" />
            </div>

            <p>{humiditys}%</p>
            <p>humidity</p>
          </div>

          <div className="wind">
            <div className="icons">
              <img className="wind" src={wind} alt="" />
            </div>

            <p>{winds}km/hr</p>
            <p style={{marginLeft:"9px"}}>wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
