import React from 'react';
import WeatherCard from './WeatherCard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import AddCityDialog from './AddCityDialog';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const initialState = {
  error: null,
  isLoaded: false,
  weathers: [],
  cities: []
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getCitiesFromLocalStorage() {
    // Check for Web Storage support.
    if (typeof Storage == 'undefined') {
      return;
    }
    const ls_cities = JSON.parse(localStorage.getItem('cities'));
    if (ls_cities) {
      this.setState({ cities: ls_cities });
      return 1;
    }
    return;
  }

  saveCitiesToLocalStorage(cities) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('cities', JSON.stringify(cities));
    }
  }

  getUserCoords() {
    let that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          that.fetchCoordsWeather(position.coords);
        },
        function(error) {
          console.warn(error.message);
          that.handleCityAdd('Paris');
        }
      );
    } else {
      // browser doesn't support geoloc
      this.handleCityAdd('Paris');
    }
  }

  fetchCoordsWeather(coords) {
    fetch(
      API_ENDPOINT +
        '?lat=' +
        coords.latitude +
        '&lon=' +
        coords.longitude +
        '&key=' +
        API_KEY
    )
      .then(res => res.json())
      .then(
        result => {
          this.handleCityAdd(result.data[0].city_name);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  fetchCitiesWeathers(cities) {
    let weathers = [];
    cities.forEach(city => {
      fetch(API_ENDPOINT + '?lang=en&city=' + city + '&key=' + API_KEY)
        .then(res => res.json())
        .then(
          result => {
            weathers.push(result.data);
            this.setState({
              isLoaded: true,
              weathers: weathers
            });
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    });
  }

  componentDidMount() {
    this.getCitiesFromLocalStorage();
    this.getUserCoords();
  }

  handleCityAdd(city) {
    let newCities = this.state.cities;
    const alreadyExist = newCities.find(cty => cty === city);
    if (!alreadyExist) {
      newCities.push(city);
      this.saveCitiesToLocalStorage(newCities);
      this.setState({ cities: newCities });
    }
    this.fetchCitiesWeathers(newCities);
  }

  handleCityDelete(cityToDelete) {
    const cities = this.state.cities.filter(city => city !== cityToDelete);
    const weathers = this.state.weathers.filter(
      city => city[0].city_name !== cityToDelete
    );

    this.saveCitiesToLocalStorage(cities);
    this.setState({ cities: cities, weathers: weathers });
  }

  handleRefresh() {
    this.fetchCitiesWeathers(this.state.cities);
  }

  render() {
    return (
      <div className="container">
        <AppBar position="fixed" className="header">
          <Toolbar>
            <Typography variant="h6" color="inherit" className="title">
              Weather App
            </Typography>
            <Tooltip title="Refresh weather" aria-label="Refresh weather">
              <IconButton
                aria-label="Refresh"
                onClick={() => {
                  this.handleRefresh();
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <AddCityDialog onCityAdd={city => this.handleCityAdd(city)} />
          </Toolbar>
        </AppBar>
        <div className="cardContainer">
          {this.state.weathers.map((weather, index) => (
            <WeatherCard
              key={index}
              data={weather}
              onCityDelete={city => this.handleCityDelete(city)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
