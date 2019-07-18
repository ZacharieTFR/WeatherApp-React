import i18n from '../i18n';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const addCity = city => ({
  type: 'ADD_CITY',
  payload: { city }
});

export const addCityError = error => ({
  type: 'ADD_CITY_ERROR',
  payload: { error }
});

export const deleteCity = city => ({
  type: 'DELETE_CITY',
  payload: { city }
});

export const fetchWeatherBegin = () => ({
  type: 'FETCH_WEATHER_BEGIN'
});
export const fetchForecastBegin = () => ({
  type: 'FETCH_FORECAST_BEGIN'
});

export const fetchCityWeatherSuccess = (weather, cityName) => ({
  type: 'FETCH_CITY_WEATHER_SUCCESS',
  payload: { weather, cityName }
});
export const fetchCityForecastSuccess = (city, forecast) => ({
  type: 'FETCH_CITY_FORECAST_SUCCESS',
  payload: { city: city, forecast: forecast }
});

export const fetchFailure = error => ({
  type: 'FETCH_FAILURE',
  payload: { error }
});

export const clearError = () => ({
  type: 'CLEAR_ERROR'
});
export function addCityAndGetWeather(cityName) {
  return (dispatch, getState) => {
    const { cities } = getState();

    const alreadyExist = cities.find(
      city => city.city_name.toUpperCase() === cityName.toUpperCase()
    );

    if (!alreadyExist) {
      dispatch(addCity(cityName));
      dispatch(fetchCityWeather(cityName));
    }
  };
}

export function getCitiesWeathers() {
  return (dispatch, getState) => {
    const { cities } = getState();
    cities.forEach(city => {
      dispatch(fetchCityWeather(city.city_name));
    });
  };
}

export function fetchCityAndWeatherFromCoords(coords) {
  return dispatch => {
    dispatch(fetchWeatherBegin());
    fetch(
      API_ENDPOINT +
        'current/' +
        '?lat=' +
        coords.latitude +
        '&lon=' +
        coords.longitude +
        '&key=' +
        API_KEY
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const city = json.data[0];
        dispatch(addCityAndGetWeather(city.city_name));
        return city;
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  };
}

export function fetchCityWeather(cityName) {
  return dispatch => {
    dispatch(fetchWeatherBegin());
    fetch(
      API_ENDPOINT +
        'current/' +
        '?lang=' +
        i18n.language +
        '&city=' +
        cityName +
        '&key=' +
        API_KEY
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const city = json.data[0];
        // It's mandatory to keep cityName for corner case where translation is involved.
        // i.e if Pékin is added, the API answer with Beijing as city name.
        // To be coherent only the API name is kept
        dispatch(fetchCityWeatherSuccess(city, cityName));
        dispatch(fetchForecast(city.city_name, city.country_code));
        return city;
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  };
}

export function fetchForecast(city, country) {
  return dispatch => {
    dispatch(fetchForecastBegin);
    fetch(
      API_ENDPOINT +
        'forecast/daily' +
        '?lang=' +
        i18n.language +
        '&city=' +
        city +
        '&country=' +
        country +
        '&key=' +
        API_KEY
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCityForecastSuccess(city, json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    console.log('fail');
    throw Error(response.statusText);
  }
  return response;
}
