import React, { useState } from 'react'
import { WEATHER_API_KEY, SEARCHED_CITY } from '../../Api'
import axios from 'axios'
import CurrentWeather from '../current-weather/CurrentWeather'
import { Card, InputGroup, Form, Button } from 'react-bootstrap';
import backgroundImage from '../../assets/BackgroundWallpaper.jpg'

const Search = () => {

    const [city, setCity] = useState('')
    const [cityData, setCityData] = useState('')
    const [fetchError, setFetchError] = useState(null)

    // geolocation
    const optionsLocation = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const successLocation = (position) => {
        const coordinates = position.coords;
        const { latitude, longitude } = coordinates
        setCity(`${latitude},${longitude}`)
    }

    const errorLocation = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // Fetch city key from API
    const getCityData = (event) => {
        console.log(event)
        event.preventDefault();
        if (!city) return;
        const request = {
            params: {
                apikey: WEATHER_API_KEY,
                q: city
            },
        }
        axios.get(`${SEARCHED_CITY}`, request).then((res) => {
            setFetchError(null)
            if (!res.data || res.data.length === 0) {
                setFetchError('Could not find the city!')
                return;
            }
            setCityData(res.data[0]);
            setCity('');
        }).catch(err => console.log(err.message));
    }

    const styles = {
        title: {
            fontSize: 30,
            lineHeight: 2,
        },
        // cardImage: {
        //     height: 600,
        // }
    }

    return (
        <div className="container mt-2 text-center">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <Card className="bg-dark text-white">
                        <Card.Img
                            src={backgroundImage}
                            alt="Background Image"
                        // style={styles.cardImage}
                        />
                        <Card.ImgOverlay>
                            <Card.Title style={styles.title}>Weather App</Card.Title>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter a city..."
                                    aria-label="Enter a city"
                                    aria-describedby="basic-addon2"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    required
                                />
                                <Button type="submit" onClick={getCityData}>
                                    <i className="fas fa-search"></i>
                                </Button>
                                <Button type="submit" onClick={() => {
                                    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, optionsLocation);
                                }}>
                                    <i className="fas fa-location-dot"></i>
                                </Button>

                            </InputGroup>
                            {fetchError && <p
                                className="fs-4 bg-danger bg-opacity-25 "
                                style={{ color: 'red' }}
                            >
                                {`${fetchError}`}
                            </p>}
                            {!fetchError && cityData && <CurrentWeather cityData={cityData} />}
                        </Card.ImgOverlay>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Search