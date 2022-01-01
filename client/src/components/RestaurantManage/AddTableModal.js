import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    button: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    textField: {
        margin: theme.spacing(1),
        width: 400,
    },
    loadingSpinner: {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: theme.spacing(10),
    }
  }));

const AddTableModal = (props) => {
    const classes = useStyles();

    const [name, setName] = React.useState('');
    const [size, setSize] = React.useState('');

    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="xl"
        >
            <DialogTitle id="scroll-dialog-title">Add a new table</DialogTitle>
            <DialogContent dividers={true}>
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Table Name"
                        type="text"
                        fullWidth
                        className={classes.textField}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <TextField
                        margin="dense"
                        label="Size"
                        type="number"
                        fullWidth
                        className={classes.textField}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()} color="primary">
                    Cancel
                    </Button>
                <Button onClick={() => props.onSave({name, size})} color="primary">
                    Add
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddTableModal;