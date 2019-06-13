import React from 'react';
import Button from '@material-ui/core/Button';
import AddLocation from '@material-ui/icons/AddLocation';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

export default function AddCityDialog(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(event) {
    const city = event.target.cityName.value;
    props.onCityAdd(city);
    event.preventDefault();
    setOpen(false);
  }

  return (
    <div>
      <Tooltip title="Add new city" aria-label="Add new city">
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          <AddLocation />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new city</DialogTitle>
        <form id="addCityForm" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="cityName"
              label="City Name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
