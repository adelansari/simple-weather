import React, { useState } from 'react'
import { WEATHER_API_KEY, SEARCHED_CITY } from '../../Api'
import axios from 'axios'
import CurrentWeather from '../current-weather/CurrentWeather'

function Search() {

    const [city, setCity] = useState('')
    const [cityData, setCityData] = useState(null)
    const [isError, setError] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()  // to stop the form from reloading the page
        getCityData({ city })
    }

    // Fetch city key from API
    const getCityData = async (location) => {
        const request = {
            params: {
                apikey: WEATHER_API_KEY,
                q: city
            },
        }
        const response = await axios.get(`${SEARCHED_CITY}`, request)
        if (!response.data || response.data.length === 0) {
            setError('Could not find the city.')
            return;
        }
        setCityData(response.data[0])
        setCity('')
    }

    // const getWeather = async (locationKey) => {
    //     const cityWeatherUrl = `${FORECAST + cityKey}`
    //     const request = {
    //         params: {
    //             apikey: WEATHER_API_KEY,
    //             metric: true
    //         },
    //     }
    //     const response = await axios.get(`${cityWeatherUrl}`, request)
    //     console.log({ response })
    // }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Enter the name of a city"
                    value={city}
                    onChange={event => setCity(event.target.value)}
                    required
                />

                <button type="submit" onClick={onSubmit}>Show weather info</button>
            </form>
            {cityData && (<CurrentWeather cityData={cityData} />)}

        </div>



    )
}

export default Search