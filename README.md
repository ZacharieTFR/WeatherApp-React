## Weather app

Fetch real-time weather of choosen cities.

This app is under development

The real-time weather is fetched from [weatherbit.io] API

## TODO:

I will add the following days

- [x] Add city
- [ ] Delete city
- [ ] Save city list in local storage
- [ ] Get current city based on location
- [ ] Add internalization

## How to run

- Create a `.env` file at project root with the following:

  ```
  REACT_APP_WEATHER_API_KEY=***your_api_key***
  REACT_APP_API_ENDPOINT=https://api.weatherbit.io/v2.0/
  REACT_APP_API_ICONS_URL=https://www.weatherbit.io/static/img/icons/
  ```

- Go to the project directory
- Execute `npm start`
- Open [http://localhost:3000] to view it in the browser.
