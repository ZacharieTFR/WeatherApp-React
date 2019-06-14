# Weather app

Simple PWA fetching current weather of chosen cities.

This app was developed using [ReactJS](https://reactjs.org/) + [Material-Ui](https://material-ui.com/) and [i18next](https://react.i18next.com/).

The current weather is fetched from [weatherbit.io](https://weatherbit.io) API.

## Features

- Get current weather based on user's location
- Add any city to the app and get its weather
- Remove a city from the app
- Cities are saved in localStorage
- Language can be switched in French or English

## How to run

- Create a `.env` file at project root with the following:

  ```txt
  REACT_APP_WEATHER_API_KEY=***your_api_key***
  REACT_APP_API_ENDPOINT=https://api.weatherbit.io/v2.0/current/
  REACT_APP_API_ICONS_URL=https://www.weatherbit.io/static/img/icons/
  ```

For development:

- Go to the project directory
- Execute `npm start`
- Open <http://localhost:3000> to view it in the browser.

For production:

- Go to the project directory
- Execute `npm run build`
- Deploy the build folder to your server
