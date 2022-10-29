import React, { useState, useEffect } from 'react'
import { WEATHER_API_KEY, FORECAST } from '../../Api'
import axios from 'axios'
import { Card, Col, Row, Figure, Spinner } from 'react-bootstrap';

const CurrentWeather = ({ cityData }) => {

    const [weather, setWeather] = useState();
    const [avgTemp, setAvgTemp] = useState();
    const [loading, setLoading] = useState("false");

    const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let today = new Date().toLocaleDateString('en-GB')
    const dayInAWeek = new Date().getDay();


    useEffect(() => {
        setWeather(null);
        setLoading("true");

        const cityWeatherUrl = `${FORECAST + cityData.Key}`

        const fetchData = async () => {
            const request = {
                params: {
                    apikey: WEATHER_API_KEY,
                    metric: true
                },
            }
            const result = await axios(`${cityWeatherUrl}`, request);

            setWeather(result.data);

            // destructuring the data:
            const formatWeather = (data) => {
                const {
                    Headline: { Text },
                    DailyForecasts,
                } = data

                const {
                    Day: { Icon, IconPhrase },
                    Temperature: { Minimum, Maximum },
                } = DailyForecasts[0]


                return { Text, Icon, IconPhrase, Minimum, Maximum }
            }

            // setTestingData(formatWeather(result.data))
            let formattedWeather = formatWeather(result.data)
            setWeather(formattedWeather)

            const minTemp = parseInt(formattedWeather.Minimum.Value);
            const maxTemp = parseInt(formattedWeather.Maximum.Value);
            setAvgTemp((minTemp + maxTemp) / 2);
            setLoading("false");
        };

        fetchData();

    }, [cityData]);


    const styles = {
        // title: {
        //     fontSize: 30,
        //     lineHeight: 2,
        //     // fontWeight: 'bold'
        // },
        superText: {
            // color: 'black',
            verticalAlign: "super",
            backgroundColor: '#9B3C0C',
            borderRadius: 5,
            fontSize: 15,
        },
        text: {
            lineHeight: 2,
        },
        avgTemp: {
            fontSize: 80,
        },
        weatherDetail: {
            marginLeft: 8,
        },
    }

    return (
        <div>
            {weather && <div>
                <div className="text-center bg-dark bg-opacity-50 py-4 font-monospace">

                    <Card.Text>{WEEK_DAYS[dayInAWeek - 1]} , {today}</Card.Text>
                    <Card.Title className="fs-1 mb-4">
                        {cityData.EnglishName}
                        <sup style={styles.superText}>{cityData.Country.ID}</sup>
                    </Card.Title>

                    <Row>
                        <Col>
                            <Figure.Image className="img-fluid"
                                width={150}
                                // height={300}
                                // src={`${ICONS}${weather.Icon}-s.png`}
                                src={`weather-icons/${weather.Icon}.png`}
                            />
                        </Col>
                        <Col>
                            <Card.Text className="fw-bold lh-1" style={styles.avgTemp}>
                                {Math.round(avgTemp)}
                                <sup>°C</sup>
                            </Card.Text>
                        </Col>
                    </Row>

                    <Card.Text style={styles.text}>min: {Math.round(weather.Minimum.Value)} °C  | max: {Math.round(weather.Maximum.Value)} °C</Card.Text>
                    <Card.Text className="text-start fst-italic" style={styles.weatherDetail} alt="WeatherDetails">{weather.Text}</Card.Text>


                    <Card.Footer className="text lh-1 mt-5 fixed-bottom position-absolute bottom-0 start-50 translate-middle-x">AccuWeather</Card.Footer>

                </div>
            </div>}
            {!weather && <div>
                <Spinner animation="border" variant="primary" loading={loading} /> <br />
            </div>}
        </div>

    )
}

export default CurrentWeather