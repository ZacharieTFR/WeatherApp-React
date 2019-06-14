## Weather app

Fetch real-time weather of chosen cities.

This app is under development with [ReactJS](https://reactjs.org/) + [Material-Ui](https://material-ui.com/) and [i18next](https://react.i18next.com/).

The real-time weather is fetched from [weatherbit.io](https://weatherbit.io) API.

## TODO

I will add in the following days:

- [x] Add city
- [x] Delete city
- [x] Save cities in local storage
- [x] Get current city based on location
- [x] Add internalization
- [ ] Clean and optimize project

## How to run

- Create a `.env` file at project root with the following:

  ```
  REACT_APP_WEATHER_API_KEY=***your_api_key***
  REACT_APP_API_ENDPOINT=https://api.weatherbit.io/v2.0/current/
  REACT_APP_API_ICONS_URL=https://www.weatherbit.io/static/img/icons/
  ```

- Go to the project directory
- Execute `npm start`
- Open http://localhost:3000 to view it in the browser.
