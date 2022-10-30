import React from 'react'
import { Card, Col, Row, Figure } from 'react-bootstrap';

const WeatherDetails = ({ weather, avgTemp }) => {

    const styles = {
        avgTemp: {
            fontSize: 80,
        },
    }

    return (
        <>
            <Row className="text-center">
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

            <div className="fs-5 mt-4 lh-1 mx-4 text-center">
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
            </div>
            <Card.Text className="fs-5 mt-4 mx-4 lh-1" alt="WeatherDetails">{weather.Text}</Card.Text>

        </>
    )
}

export default WeatherDetails