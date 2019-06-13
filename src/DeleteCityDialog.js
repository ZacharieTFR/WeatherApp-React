import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ClearIcon from '@material-ui/icons/Clear';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  deleteBtn: {
    float: 'right'
  }
});

export default function DeleteCityDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete(event) {
    console.log(props);
    props.onCityDelete(props.city);
    setOpen(false);
  }

  return (
    <div>
      <Tooltip title="Delete city" aria-label="Delete city">
        <IconButton
          aria-label="Delete"
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
            Delete {props.city} ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This city will be definitely deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
