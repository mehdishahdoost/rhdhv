import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Car, CarServiceClient} from '../proto/car_grpc_web_pb';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '400px',
        height: '500px',
        marginTop: '50px'
    },
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    button: {
        marginTop: "25px"
    }
}));

function AddCar() {
    const classes = useStyles();
    const srv = new CarServiceClient(process.env.REACT_APP_ENVOY_PROXY_URL)
    const [open, setOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [severity, setSeverity] = React.useState("success")

    function handleClose() {
        setOpen(false)
    }

    const [state, setState] = React.useState({
        model: "",
        brand: "",
        yearOfRelease: 2020,
        make: "",
        version: 1,
        price: 0,
        annualMaintenanceCost: 0,
        fuelConsumption: 0
    })

    function addEvent() {
        let car = new Car()
        car.setBrand(state.brand);
        car.setModel(state.model);
        car.setPrice(state.price);
        car.setReleaseyear(state.yearOfRelease);
        car.setMake(state.make);
        car.setVersion(state.version);
        car.setAnnualmaintenancecost(state.annualMaintenanceCost);
        car.setFuelconsumption(state.fuelConsumption);

        srv.addCar(car, {}, (err, response) => {
            if (err || response.array[1] != undefined) {
                setAlertMessage("Error: Car not saved!")
                setSeverity("error")
                setOpen(true)
            } else {
                setAlertMessage(response.array[0])
                setSeverity("success")
                setOpen(true)
            }
        });
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minWidth: '100vh'}}
        >
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <form className={classes.root}>
                        <span>Add new car to market</span>
                        <TextField name="model" value={state.model} label="Model" onChange={handleChange}
                        ></TextField>
                        <TextField name="brand" value={state.brand} label="Brand" onChange={handleChange}></TextField>
                        <TextField name="yearOfRelease" value={state.yearOfRelease} label="Y.Of.Release"
                                   onChange={handleChange}></TextField>
                        <TextField name="fuelConsumption" value={state.fuelConsumption}
                                   label="Fuel Consumption" onChange={handleChange}></TextField>
                        <TextField name="annualMaintenanceCost" value={state.annualMaintenanceCost}
                                   label="Annual Maintenance" onChange={handleChange}></TextField>
                        <TextField name="make" value={state.make} label="Make" onChange={handleChange}></TextField>
                        <TextField name="version" value={state.version} label="Version"
                                   onChange={handleChange}></TextField>
                        <TextField name="price" value={state.price} label="Price" onChange={handleChange}></TextField>
                        <Button onClick={addEvent} variant="contained" color="primary" className={classes.button}>Add
                            Car</Button>
                    </form>
                </Paper>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Grid>

    );
}

export default AddCar;
