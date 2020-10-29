import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '400px',
        height: '450px',
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
                    <TextField label="Model"></TextField>
                    <TextField label="Brand"></TextField>
                    <TextField label="Y.Of.Release"></TextField>
                    <TextField label="Fuel Consumption"></TextField>
                    <TextField label="Annual Maintenance"></TextField>
                    <TextField label="Make"></TextField>
                    <TextField label="Version"></TextField>
                    <Button  variant="contained" color="primary" className={classes.button}>Add Car</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default AddCar;
