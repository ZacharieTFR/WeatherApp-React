import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
  card: {
    margin: '12px 0'
  },
  lightGrey: {
    color: '#8c8c8c'
  }
});

export default function WeatherCard(props) {
  const classes = useStyles();
  if (!props) {
    return;
  }
  const weatherData = props.data[0];
  const dateTime = new Date(weatherData.last_ob_time);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  const windSpeed = weatherData.wind_spd;
  const windDirection = weatherData.wind_cdir_full;

  const iconUrl = 'https://www.weatherbit.io/static/img/icons/' + weatherData.weather.icon + '.png';
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {weatherData.city_name}, {weatherData.country_code}
            </Typography>
            <Typography className={classes.lightGrey} variant="subtitle2">
              {date}, {time}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img align="left" src={iconUrl} alt="weather icon" />
            <Typography variant="h3">{weatherData.temp}°C</Typography>
            <Typography variant="subtitle1">{weatherData.weather.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>Wind: </span>
              {windSpeed} m/s, {windDirection}
            </Typography>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>Humidity: </span>
              {weatherData.rh} %
            </Typography>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>Cloud coverage: </span>
              {weatherData.clouds} %
            </Typography>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>Precipitation:</span>
              {weatherData.precip.toFixed(2)} mm/hr
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}