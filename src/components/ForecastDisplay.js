import { withStyles } from '@material-ui/styles';
import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from '../i18n';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ICONS_URL = process.env.REACT_APP_API_ICONS_URL;

const styles = theme => ({
  root: {
    marginTop: '1.5em',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  img: {
    height: 64,
    width: 64,
    display: 'block'
  },
  typoBlock: {
    display: 'block'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '100%'
  },
  forecastDayDisplay: {
    minWidth: '75px',
    height: '120px !important'
  },
  lightGrey: {
    color: '#8c8c8c'
  }
});

class ForecastDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: []
    };
  }
  fetchForecast() {
    fetch(
      API_ENDPOINT +
        'forecast/daily' +
        '?lang=' +
        i18n.language +
        '&city=' +
        this.props.city +
        '&country=' +
        this.props.country +
        '&key=' +
        API_KEY
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({ forecast: result.data.slice(1, 7) });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  componentDidMount() {
    this.fetchForecast(this.props.city);
  }

  render() {
    const { t } = this.props;
    const classes = this.props.classes;
    const day_names = t('day_names', { returnObjects: true });
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {this.state.forecast.map((forecast, id) => (
            <center className={classes.forecastDayDisplay} key={id}>
              <Typography className={classes.typoBlock} variant="body1">
                {day_names[new Date(forecast.ts * 1000).getDay()]}
              </Typography>
              <img
                className={classes.img}
                src={API_ICONS_URL + forecast.weather.icon + '.png'}
                height="64"
                width="64"
                alt="weather icon"
              />
              <Typography
                className={`${classes.typoBlock} ${classes.lightGrey}`}
                variant="caption"
              >
                {forecast.app_max_temp}° {forecast.app_min_temp}°
              </Typography>
            </center>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(withTranslation()(ForecastDisplay));
