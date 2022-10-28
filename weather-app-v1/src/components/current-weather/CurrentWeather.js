import React, { useState, useEffect } from 'react'
import { WEATHER_API_KEY, FORECAST } from '../../Api'
import axios from 'axios'
import { Card } from 'react-bootstrap';


function CurrentWeather({ cityData }) {

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

      console.log(response.data)

      setWeather(response.data)
    }

    // calling the function
    getWeather().catch(err => console.log(err.message))

  }, [cityData.Key])

  return (
    <div>
      <Card className="bg-dark text-white">
        <Card.Img src="holder.js/100px270" alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  )
}

export default CurrentWeather