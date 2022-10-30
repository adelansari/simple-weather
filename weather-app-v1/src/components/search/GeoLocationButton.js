import React from 'react'
import { Button } from 'react-bootstrap';

const GeoLocationButton = ({ setCity }) => {
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

    return (
        <>
            <Button type="submit" onClick={() => {
                navigator.geolocation.getCurrentPosition(successLocation, errorLocation, optionsLocation);
            }}>
                <i className="fas fa-location-dot"></i>
            </Button>
        </>
    )
}

export default GeoLocationButton