import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { deleteCity } from '../actions';

const useStyles = makeStyles({
  deleteBtn: {
    float: 'right'
  }
});

function DeleteCityDialog(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete(event) {
    props.deleteCity(props.city);
    setOpen(false);
  }

  return (
    <div>
      <Tooltip title={t('delete_city')} aria-label={t('delete_city')}>
        <IconButton
          aria-label={t('delete')}
          className={classes.deleteBtn}
          onClick={handleClickOpen}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ textTransform: 'capitalize' }}
          >
            {t('delete')} {props.city} ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('confirm_delete')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} color="primary">
              {t('delete')}
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              {t('cancel')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    deleteCity: city => {
      dispatch(deleteCity(city));
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
)(DeleteCityDialog);
