import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import { addCityAndGetWeather } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const useStyles = makeStyles({
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
});

function AddCityDialog(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpenSnackBarError() {
    setOpenSnackBar(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const cityName = event.target.cityName.value;
    const alreadyExist = props.cities.find(
      city => city.city_name.toUpperCase() === cityName.toUpperCase()
    );

    if (alreadyExist) {
      setOpenSnackBar(true);
      return;
    }
    props.addCity(cityName);
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Tooltip title={t('add_city')} aria-label={t('add_city')}>
        <Fab color="secondary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{t('add_city')}</DialogTitle>
        <form id="addCityForm" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="cityName"
              inputProps={{ pattern: '^([A-zÀ-ÖØ-öø-ÿ-])*$' }}
              label={t('city_name')}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              {t('add')}
            </Button>
            <Button onClick={handleClose} color="primary">
              {t('cancel')}
            </Button>
          </DialogActions>
        </form>
        <Snackbar
          open={openSnackBar}
          ContentProps={{
            classes: {
              root: classes.root,
              message: classes.message
            }
          }}
          message={
            <>
              <ErrorIcon />
              <span className={classes.message}>{t('alreadyExist')}</span>
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={handleOpenSnackBarError}
              >
                <CloseIcon size="small" />
              </IconButton>
            </>
          }
        />
      </Dialog>
    </React.Fragment>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    addCity: cityName => {
      dispatch(addCityAndGetWeather(cityName));
    }
  };
};

const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCityDialog);
