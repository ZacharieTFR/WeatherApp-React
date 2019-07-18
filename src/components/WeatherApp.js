import React, { Suspense } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import LangIcon from '@material-ui/icons/Language';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from 'react-i18next';
import compose from 'recompose/compose';
import i18n from '../i18n';
import { connect } from 'react-redux';
import {
  getCitiesWeathers,
  fetchCityAndWeatherFromCoords,
  clearError
} from '../actions/index';

import AddCityDialog from './AddCityDialog';
import WeatherCard from './WeatherCard';

const styles = {
  root: {
    backgroundColor: '#D32F2F',
    display: 'flex',
    alignItems: 'center'
  },
  message: {
    paddingLeft: '12px',
    display: 'flex',
    alignItems: 'center'
  }
};
class WeatherApp extends React.Component {
  getUserCoordsAndWeather() {
    let that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          that.props.fetchCityAndWeatherFromCoords(position.coords);
        },
        function(error) {
          // if any error occurs (user decline,timeout etc..)
          console.warn(error.message);
        }
      );
    }
  }

  componentDidMount() {
    this.getUserCoordsAndWeather();
    this.props.getCitiesWeathers();
  }

  handleRefresh() {
    this.props.getCitiesWeathers();
  }

  handleChangeLang(event) {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
  }

  handleCloseSnackError() {
    this.props.clearError();
  }

  render() {
    const { t } = this.props;
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <Suspense fallback={<div>Loading</div>}>
          <AppBar position="fixed" className="header">
            <Toolbar>
              <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
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
              <AddCityDialog />
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: '4.5em' }}>
            {this.props.cities.map((city, index) => (
              <WeatherCard key={index} city={city} />
            ))}
          </div>
          <Snackbar
            open={Boolean(this.props.error)}
            ContentProps={{
              classes: {
                root: classes.root,
                message: classes.message
              }
            }}
            message={
              <React.Fragment>
                <ErrorIcon />
                <span className={classes.message}>{t(this.props.error)}</span>
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => {
                    this.handleCloseSnackError();
                  }}
                >
                  <CloseIcon size="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCitiesWeathers: () => {
      dispatch(getCitiesWeathers());
    },
    fetchCityAndWeatherFromCoords: coords => {
      dispatch(fetchCityAndWeatherFromCoords(coords));
    },
    clearError: () => {
      dispatch(clearError());
    }
  };
};

const mapStateToProps = state => {
  return {
    cities: state.cities,
    loadingWeather: state.loadingWeather,
    loadingForecast: state.loadingForecast,
    error: state.error
  };
};

export default compose(
  withTranslation(),
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WeatherApp);
