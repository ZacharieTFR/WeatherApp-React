import React from 'react';
import WeatherCard from './WeatherCard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import AddCityDialog from './AddCityDialog';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const initialState = {
  error: null,
  isLoaded: false,
  weathers: [],
  cities: ['Paris']
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  fetchCities(cities) {
    this.setState({
      weathers: initialState.weathers
    });
    cities.forEach(city => {
      fetch(API_ENDPOINT + 'current?lang=en&city=' + city + '&key=' + API_KEY)
        .then(res => res.json())
        .then(
          result => {
            let weathers = JSON.parse(JSON.stringify(this.state.weathers));
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
    this.fetchCities(this.state.cities);
  }
  handleCityAdd(city) {
    let newCities = [...this.state.cities];
    newCities.push(city);
    this.setState({ cities: newCities });
    this.fetchCities(newCities);
  }
  handleCityDelete(cityToDelete) {
    let cities = [...this.state.cities];
    let weathers = JSON.parse(JSON.stringify(this.state.weathers));

    const cityIndex = cities.findIndex(city => city === cityToDelete);
    cities.splice(cityIndex, 1);
    weathers.splice(cityIndex, 1);

    this.setState({ cities: cities, weathers: weathers });
  }
  render() {
    return (
      <div className="container">
        <AppBar position="fixed" className="header">
          <Toolbar>
            <Typography variant="h6" color="inherit" className="title">
              Weather App
            </Typography>
            <AddCityDialog onCityAdd={city => this.handleCityAdd(city)} />
          </Toolbar>
        </AppBar>
        <div className="cardContainer">
          {this.state.weathers.map((weather, index) => (
            <WeatherCard
              key={index}
              city={this.state.cities[index]}
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
