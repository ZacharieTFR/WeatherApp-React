import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteCityDialog from './DeleteCityDialog';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import ForecastDisplay from './ForecastDisplay';

const useStyles = makeStyles({
  card: {
    margin: '12px 0'
  },
  lightGrey: {
    color: '#8c8c8c'
  },
  deleteBtn: {
    float: 'right'
  }
});

const API_ICONS_URL = process.env.REACT_APP_API_ICONS_URL;

export default function WeatherCard(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  if (!props) {
    return;
  }

  function handleCityDelete(city) {
    props.onCityDelete(city);
  }

  const weatherData = props.data[0];
  const cityName = weatherData.city_name;
  const country = weatherData.country_code;
  const dateTime = new Date(weatherData.last_ob_time);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  const windSpeed = weatherData.wind_spd;
  const windDirection = weatherData.wind_cdir_full;
  const iconUrl = API_ICONS_URL + weatherData.weather.icon + '.png';

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DeleteCityDialog
              onCityDelete={() => handleCityDelete(cityName)}
              city={weatherData.city_name}
            />
            <Typography variant="h5">
              {weatherData.city_name}, {weatherData.country_code}
            </Typography>
            <Typography className={classes.lightGrey} variant="subtitle2">
              {date}, {time}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <img align="left" src={iconUrl} alt="weather icon" />
            <Typography variant="h2">{weatherData.temp}°</Typography>
            <Typography variant="subtitle1">
              {weatherData.weather.description}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>{t('sunrise')}: </span>
              {weatherData.sunrise}
            </Typography>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>{t('sunset')}: </span>
              {weatherData.sunset}
            </Typography>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>{t('wind')}: </span>
              {windSpeed} m/s, {windDirection}
            </Typography>
            <Typography variant="subtitle1">
              <span className={classes.lightGrey}>{t('humidity')}: </span>
              {weatherData.rh} %
            </Typography>
          </Grid>
        </Grid>
        <ForecastDisplay city={cityName} country={country} />
      </CardContent>
    </Card>
  );
}
