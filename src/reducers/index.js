const cities = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CITY':
      return {
        ...state,
        cities: [...state.cities, { city_name: action.payload.city }]
      };

    case 'DELETE_CITY':
      return {
        ...state,
        cities: state.cities.filter(
          city => city.city_name !== action.payload.city
        )
      };

    // Useful to show a loading indicator (futur feature)
    case 'FETCH_WEATHER_BEGIN':
      return {
        ...state,
        loadingWeather: true,
        error: null
      };

    case 'FETCH_FORECAST_BEGIN':
      return {
        ...state,
        loadingForecast: true,
        error: null
      };

    case 'FETCH_CITY_WEATHER_SUCCESS':
      return {
        ...state,
        loadingWeather: false,
        cities: state.cities.map((item, index) => {
          if (
            item.city_name === action.payload.weather.city_name ||
            item.city_name === action.payload.cityName
          ) {
            return action.payload.weather;
          }
          return item;
        })
      };

    case 'FETCH_CITY_FORECAST_SUCCESS':
      return {
        ...state,
        loadingForecast: false,
        cities: state.cities.map((item, index) => {
          if (item.city_name !== action.payload.city) {
            return item;
          }
          return { ...item, forecast: action.payload.forecast.slice(1, 8) };
        })
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loadingWeather: false,
        loadingForecast: false,
        error: action.payload.error
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default cities;
