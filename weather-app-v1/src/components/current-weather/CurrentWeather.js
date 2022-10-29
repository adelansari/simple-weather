import React, { useState, useEffect } from 'react'
import { WEATHER_API_KEY, FORECAST } from '../../Api'
import axios from 'axios'
import { Card, InputGroup, Form, Button } from 'react-bootstrap';


const CurrentWeather = ({ cityData }) => {

  const [weather, setWeather] = useState();

  useEffect(() => {

    // data fetching
    const getWeather = async () => {

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(1000);

      const cityWeatherUrl = `${FORECAST + cityData.Key}`
      const request = {
        params: {
          apikey: WEATHER_API_KEY,
          metric: true
        },
      }
      const response = await axios.get(`${cityWeatherUrl}`, request)
      setWeather(response.data)
      
    }

    // calling the function
    (async () => await getWeather())();

  }, [cityData.Key])


  const styles = {
    title: {
      fontSize: 30,
      lineHeight: 2,
      // fontWeight: 'bold'
    },
    superText: {
      // color: 'black',
      verticalAlign: "super",
      backgroundColor: '#9B3C0C',
      borderRadius: 5,
      fontSize: 15,
    },
    text: {
      lineHeight: 1,
    },
  }

  return (
    <div>
      <div className="bg-dark bg-opacity-50 py-4 text-center">
        <Card.Title style={styles.title}>
          {cityData.EnglishName}
          <sup style={styles.superText}>{cityData.Country.ID}</sup>
        </Card.Title>
        {/* <Card.Text>min: {weather.DailyForecasts[0].Temperature.Minimum.Value} °C</Card.Text>
        <Card.Text>max: {weather.DailyForecasts[0].Temperature.Maximum.Value} °C</Card.Text> */}


        <Card.Text style={styles.text}>
          {weather.DailyForecasts[0].Day.PrecipitationIntensity} {weather.DailyForecasts[0].Day.PrecipitationType}
          </Card.Text>

        {/* <Card.Text>Min: {Math.round({weather.Temperature})}°C</Card.Text> */}
        {/* <Card.Text>Max: {Math.round(weather[1].Temperature.Maximum.Value)}°C</Card.Text> */}
      </div>
    </div>
  )
}

export default CurrentWeather