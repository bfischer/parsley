import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRestaurant, getRestaurantTables, addRestaurantTable } from '../../actions/restaurant';
import { setAlert } from '../../actions/alert';
import AddTableModal from './AddTableModal';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        overflowX: 'auto',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    typography: {
        paddingBottom: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    textField: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(2),
        width: 300,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(1),
    },
    chipPaid: {
        color: 'green',
        border: '1px solid green',
    },
    buttonPaid: {
        color: 'green',
        '&:hover': {
            background: "#c4e6c46b",
        }
    },
    loadingSpinner: {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: theme.spacing(10),
    }
  }));

  const tableData = [
      {
          name: 'Table 1',
          status: 'Occupied',
          size: '4',
          assignedStaff: 'Blake Pogue'
      },
      {
        name: 'Table 2',
        status: 'Occupied',
        size: '4',
        assignedStaff: 'John Doe'
    },
    {
        name: 'Table 3',
        status: 'Vacant',
        size: '6',
        assignedStaff: 'John Doe'
    },
    {
        name: 'Table 4',
        status: 'Occupied',
        size: '4',
        assignedStaff: 'Blake Pogue'
    },
    {
        name: 'Table 5',
        status: 'Paid',
        size: '2',
        assignedStaff: 'Jane Dorris'
    },
    {
        name: 'Table 6',
        status: 'Vacant',
        size: '2',
        assignedStaff: 'John Doe'
    },
    {
        name: 'Table 7',
        status: 'Paid',
        size: '2',
        assignedStaff: 'Blake Pogue'
    },
  ]

  const menuItemData = [
      {
          name: 'Chicken Parmesaen',
          price: '15.39',
          type: 'entree',
      },
      {
          name: 'Polish Sausage',
          price: '14.39',
          type: 'entree',
      },
      {
          name: 'Italian Hot Dog',
          price: '15.65',
          type: 'entree',
      },
      {
          name: 'Vienna Sausage',
          price: '15.79',
          type: 'entree',
      },
      {
          name: 'Andouille',
          price: '12.49',
          type: 'entree',
      },
      {
          name: 'Diet Coke',
          price: '2.99',
          type: 'beverage',
      },
      {
          name: 'Red Wine Blend',
          price: '15',
          type: 'beverage',
      },

  ]

const RestaurantManage = (props) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = React.useState(true);
    const [isTablesLoading, setIsTablesLoading] = React.useState(false);
    const [showAddTableModal, setShowAddTableModal] = React.useState(false);

    React.useEffect(() => {
        props.getRestaurant(props.location.state.restaurantId);
        props.getRestaurantTables(props.location.state.restaurantId);
        setIsLoading(false);
    }, []);

    const getStatusChip = (status) => {
        if(status === 'Occupied') {
            return <Chip variant="outlined" color="secondary" size="small" icon={<FaceIcon />} label="Occupied" />
        }

        if(status === 'Paid') {
            return <Chip variant="outlined" color="primary" size="small" icon={<CheckIcon />} label="Paid" className={classes.chipPaid} />
        }

        return <Chip variant="outlined" color="primary" size="small" icon={<CheckIcon />} label="Ready" />
    }

    const getOrderButton = (status) => {
        if(status === 'Occupied') {
            return  <Button size="small" color="secondary">Close Order</Button>
        }

        if(status === 'Paid') {
            return  <Button size="small" color="secondary" className={classes.buttonPaid} >Complete Order</Button>
        }

        return <Button size="small" color="primary">New Order</Button>
    }

    const handleAddTableSave = (table) => {
        setIsTablesLoading(true);
        props.addRestaurantTable(props.restaurant._id, table);
        setShowAddTableModal(false);
        setIsTablesLoading(false);
        props.setAlert('Success!', 'success');
    }

    return (
        <div>
            <div className="page-information">
                <h1>Manage</h1>
                <span className="page-description">
                    View your restaurant profile, manage your menu and tables.
                </span>
            </div>
            <AddTableModal open={showAddTableModal} onClose={() => setShowAddTableModal(false)} onSave={handleAddTableSave} />
            <Paper className={classes.paper}>
                <Typography variant="subtitle2" color="inherit" noWrap className={classes.typography}>
                    My Restaurant
                </Typography>
                <Divider />
                {
                    isLoading || !props.restaurant ? <div className={classes.loadingSpinner}><CircularProgress /></div>
                    :
                    <div className={classes.container}>
                        <div>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={props.restaurant.name}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={props.restaurant.phone}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={props.restaurant.address}
                            />
                        </div>
                    </div>
                }
                
            </Paper>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => setShowAddTableModal(!showAddTableModal)}>
                    Add Table
            </Button>
            <Paper className={classes.paper}>
                <Typography variant="subtitle2" color="inherit" noWrap className={classes.typography}>
                    Available Tables
                </Typography>
                <Divider />
                {
                    isLoading || isTablesLoading || !props.restaurant ? <div className={classes.loadingSpinner}><CircularProgress /></div>
                        :
                        <div>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="left">Max Size</TableCell>
                                        <TableCell align="left">Assigned Staff</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData && tableData.map(row => (
                                        <TableRow key={row.name + row.size}>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">
                                                {getStatusChip(row.status)}
                                            </TableCell>
                                            <TableCell align="left">{row.size}</TableCell>
                                            <TableCell align="left">{row.assignedStaff}</TableCell>
                                            <TableCell align="center">
                                                {getOrderButton(row.status)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={tableData.length}
                                rowsPerPage={5}
                                page={1}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                onChangePage={() => { }}
                                onChangeRowsPerPage={() => { }}
                            />
                        </div>
                }
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle2" color="inherit" noWrap className={classes.typography}>
                    Menu Items
                </Typography>
                <Divider />
                {
                    isLoading || !props.restaurant ? <div className={classes.loadingSpinner}><CircularProgress /></div>
                    :
                    <div>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menuItemData && menuItemData.map(row => (
                                    <TableRow key={row.name + row.price}>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.type}</TableCell>
                                        <TableCell align="left">{row.price}</TableCell>
                                        <TableCell align="center">
                                            <IconButton aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={menuItemData.length}
                            rowsPerPage={5}
                            page={1}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={() => { }}
                            onChangeRowsPerPage={() => { }}
                        />
                    </div>
                }
            </Paper>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        restaurant: state.restaurant.selectedRestaurant,
        tables: state.restaurant.selectedRestaurantTables,
    }
}

export default withRouter(connect(mapStateToProps, { getRestaurant, getRestaurantTables, addRestaurantTable, setAlert })(RestaurantManage));