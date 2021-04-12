import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link to="#" onClick={handleClickOpen}>
        اصالت اثر
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: '100%' }}
      >
        <DialogTitle id="alert-dialog-title">اصالت اثر </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A certificate of authenticity (COA) is a document from an
            authoritative source that verifies the artwork’s authenticity. While
            many COAs are signed by the artist, others will be signed by the
            representing gallery or the printmaker who collaborated with the
            artist on the work. For secondary market works, authorized estates
            or foundations are often the issuing party. COAs typically include
            the name of the artist, the details (title, date, medium,
            dimensions) of the work in question, and whenever possible an image
            of the work.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
