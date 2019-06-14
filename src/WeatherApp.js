import React, { Suspense } from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import LangIcon from '@material-ui/icons/Language';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import AddCityDialog from './AddCityDialog';
import WeatherCard from './WeatherCard';
import './App.css';
import { withTranslation } from 'react-i18next';
import i18n from './i18n';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weathers: [],
      cities: []
    };
  }
  getCitiesFromLocalStorage() {
    // Check for Web Storage support.
    if (typeof Storage == 'undefined') {
      return;
    }
    const ls_cities = JSON.parse(localStorage.getItem('cities'));
    if (ls_cities) {
      this.setState({ cities: ls_cities });
    }
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
      fetch(
        API_ENDPOINT +
          '?lang=' +
          i18n.language +
          '&city=' +
          city +
          '&key=' +
          API_KEY
      )
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
  handleChangeLang(event) {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
  }
  render() {
    const { t } = this.props;
    return (
      <div className="container">
        <Suspense fallback={<div>Loading</div>}>
          <AppBar position="fixed" className="header">
            <Toolbar>
              <Typography variant="h6" color="inherit" className="title">
                Weather App
              </Typography>

              <Select
                onChange={e => {
                  this.handleChangeLang(e);
                }}
                IconComponent={LangIcon}
                value={i18n.language}
              >
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
              <Tooltip title={t('refresh')} aria-label={t('refresh')}>
                <IconButton
                  aria-label={t('refresh')}
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
        </Suspense>
      </div>
    );
  }
}
export default withTranslation()(WeatherApp);
