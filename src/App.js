import React from 'react';
import WeatherCard from './WeatherCard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: []
    };
  }
  componentDidMount() {
    fetch('https://api.weatherbit.io/v2.0/current?lang=en&city=Paris&city=boston&key=HIDDEN_API_KEY')
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            weather: result.data
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    return (
      <div className="container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className="title">
              Weather App
            </Typography>
            <Button variant="contained" color="secondary">
              Add city
              <AddIcon />
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.isLoaded && <WeatherCard data={this.state.weather} />}
      </div>
    );
  }
}

export default App;
