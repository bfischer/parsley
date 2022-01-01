import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Column, ButtonGroup, ButtonIcon, ButtonMenu, Badge, Modal, Input } from 'react-rainbow-components';
import { loadAllRestaurants, addRestaurant, deleteRestaurant } from '../../actions/restaurant';
import './Restaurants.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


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

const badgeStyles = { color: '#1de9b6' };
const StatusBadge = ({ value }) => <Badge label={value} variant="lightest" style={badgeStyles} />;

const Restaurants = (props) => {
    const classes = useStyles();
    const [showAddRestaurantModal, setShowAddRestaurantModal] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true);

    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const [nameError, setNameError] = React.useState('');

    React.useEffect(() => {
        const fetchRestaurants = async () => {
            await props.loadAllRestaurants();
            setIsLoading(false);
        }

        fetchRestaurants();
    }, [])

    const handleCloseAddRestaurantModal = () => {
        setShowAddRestaurantModal(false);
        setNameError('');
    }

    const handleAddRestaurantSaveClicked = () => {
        let isValid = name;

        if(!name) {
            setNameError('A name is required')
        }

        if(isValid) {
            props.addRestaurant({name, phone, address});
            setShowAddRestaurantModal(false);
        }
    }

    const handleRestaurantAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleRestaurantNameChange = (e) => {
        setName(e.target.value);
    }

    const handleRestaurantPhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderAddRestaurantModal = () => {
        return (
            <Dialog
                open={showAddRestaurantModal}
                onClose={handleCloseAddRestaurantModal}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="xl"
            >
                <DialogTitle id="scroll-dialog-title">Add a restaurant</DialogTitle>
                <DialogContent dividers={true}>
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Restaurant Name"
                        type="text"
                        fullWidth
                        className={classes.textField}
                        onChange={handleRestaurantNameChange}
                        helperText={nameError}
                        error={!!nameError}
                        required
                    />
                </div>
                <div>
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        className={classes.textField}
                        onChange={handleRestaurantPhoneChange}
                    />
                </div>
                <div>
                    <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        className={classes.textField}
                        onChange={handleRestaurantAddressChange}
                    />
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddRestaurantModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddRestaurantSaveClicked} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const handleManageRestaurantClick = (restaurant) => event => {
        props.history.push({ pathname: '/restaurant-manage', state: { restaurantId: restaurant._id }})
    }

    const handleDeleteRestaurantClick = restaurant => event => {
        props.deleteRestaurant(restaurant._id)
    }
   
    return (
        <div>
            <div className="page-information">
                <h1>Restaurants</h1>
                <span className="page-description">
                    View and manage your restaurants
                </span>
            </div>
            {renderAddRestaurantModal()}
            <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon />} onClick={() => setShowAddRestaurantModal(true)}>
                Add new restaurant
            </Button>
            <Paper className={classes.root}>
                {
                    isLoading ? <div className={classes.loadingSpinner}><CircularProgress /></div>
                    :
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Created</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.restaurants && props.restaurants.map(row => (
                                    <TableRow key={row.name + row.createdOn}>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.address}</TableCell>
                                        <TableCell align="right">{row.phone}</TableCell>
                                        <TableCell align="right">{row.createdOn}</TableCell>
                                        <TableCell align="right">
                                            <Button size="small" color="primary" onClick={handleManageRestaurantClick(row)}>Manage</Button>
                                            <Button size="small" color="secondary" onClick={handleDeleteRestaurantClick(row)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                }
            </Paper>
        </div>
        
      );
}

const mapStateToProps = state => ({
    restaurants: state.restaurant.restaurants,
})

export default withRouter(connect(mapStateToProps, { loadAllRestaurants, addRestaurant, deleteRestaurant })(Restaurants));