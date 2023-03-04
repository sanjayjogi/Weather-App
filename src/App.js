import axios from 'axios';
import { useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import Search from './components/search/search';

function App() {

  const getImage = () =>{
    axios.get("https://api.unsplash.com/search/photos?page=1&query=office&client_id=ZO4B9VkDF7asOaDOsNW_YvdY8KLksh6zSgTBe2JBRyk")
    .then((response)=>{
      console.log(response);
    })
  }

  const[currentWeather, setCurrentWeather] = useState(null);
  const[forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async(response)=>{
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse})

    })
    .catch((err) => console.log(err))

  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleSearchChange}/>
      {currentWeather &&<CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
