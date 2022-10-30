import React, { useState, useEffect } from 'react'
import { WEATHER_API_KEY, FORECAST } from '../../Api'
import axios from 'axios'
import { Card, Col, Row, Figure, Spinner } from 'react-bootstrap';

const CurrentWeather = ({ cityData }) => {

    const [weather, setWeather] = useState();
    const [avgTemp, setAvgTemp] = useState();
    const [loading, setLoading] = useState("false");

    const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = new Date()
    let today = day.toLocaleDateString('en-GB')
    const dayInAWeek = day.getDay();


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
        superText: {
            color: "black",
            verticalAlign: "super",
            backgroundColor: 'yellow',
            borderRadius: 5,
            fontSize: 15,
            fontWeight: 'bold',
        },
        avgTemp: {
            fontSize: 80,
        },
        // weatherDetail: {
        //     marginLeft: 8,
        // },
    }

    return (
        <div>
            {weather && <div>
                <div className="text-center bg-dark bg-opacity-50 py-4 font-monospace">


                    
                    <div className="bg-dark bg-opacity-25 mx-4 border border-info">
                    <Card.Text className="fs-6 mt-3">{WEEK_DAYS[dayInAWeek]} , {today}</Card.Text>
                    <Card.Title className="fs-1 mb-4">
                        {cityData.EnglishName}
                        <sup style={styles.superText}>{cityData.Country.ID}</sup>
                    </Card.Title>

                    </div>

                    <Row >
                        <Col>
                            <Figure.Image className="img-fluid mt-4"
                                width={150}
                                // height={300}
                                // src={`${ICONS}${weather.Icon}-s.png`}
                                src={`weather-icons/${weather.Icon}.png`}
                            />
                        </Col>
                        <Col>
                            <Card.Text className="fw-bold lh-1 mt-4" style={styles.avgTemp}>
                                {Math.round(avgTemp)}
                                <sup>°C</sup>
                            </Card.Text>
                        </Col>
                    </Row>

                    <Card.Text className="fs-5 mt-4 lh-1">
                        <Row>
                            <Col className="text-info fw-bold fs-3">
                                {weather.IconPhrase}
                            </Col>
                            <Col className="fst-italic">
                                min: {Math.round(weather.Minimum.Value)} °C
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col className=".text-light fst-italic">
                                max: {Math.round(weather.Maximum.Value)} °C
                            </Col>
                        </Row>

                    </Card.Text>
                    <Card.Text className="fs-5 mx-4 lh-1" alt="WeatherDetails">{weather.Text}</Card.Text>
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