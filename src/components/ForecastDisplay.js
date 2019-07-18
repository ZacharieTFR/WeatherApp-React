import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const API_ICONS_URL = process.env.REACT_APP_API_ICONS_URL;

const useStyles = makeStyles({
  root: {
    marginTop: '1.5em',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  progress: {
    marginLeft: '50%'
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

function ForecastDisplay(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  if (!props.city.forecast) {
    return <CircularProgress className={classes.progress} />;
  }

  const day_names = t('day_names', { returnObjects: true });

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.city.forecast.map((forecast, id) => (
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

const mapStateToProps = state => {
  return {
    loadingForecast: state.loadingForecast
  };
};

export default connect(mapStateToProps)(ForecastDisplay);
