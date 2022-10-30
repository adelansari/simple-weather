
export const WEATHER_API_KEY = process.env.REACT_APP_API_KEY
export const SEARCHED_CITY = 'https://dataservice.accuweather.com/locations/v1/cities/search'
export const FORECAST = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/'
export const ICONS = 'https://developer.accuweather.com/sites/default/files/'

// const CityKey = location => `${SEARCHED_CITY}?apikey=${WEATHER_API_KEY}&${location}`
// const WeatherUrl = cityKey => `${FORECAST+cityKey}?apikey=${WEATHER_API_KEY}&metric=true`

// export function getCityKey(city) {
//     return fetch(CityKey(city)).then(res => res.json())
// }
// export function getWeather(key) {
//     return fetch(WeatherUrl(key)).then(res => res.json())
// }