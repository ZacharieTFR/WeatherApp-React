import React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { useTranslation } from 'react-i18next';

export default function AddCityDialog(props) {
  const { t } = useTranslation();
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
      </Dialog>
    </div>
  );
}
