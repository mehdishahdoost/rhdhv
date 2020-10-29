import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '400px',
        height: '250px',
        marginTop: '100px'
    },
    root: {
        padding: theme.spacing(3, 2),
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    button: {
        marginTop: "40px"
    }
}));

function Login() {
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
                        <Typography align="center" >

                        <Icon fontSize="large">account_circle</Icon>
                        </Typography>
                        <TextField label="Username"></TextField>
                        <TextField type="password" label="password"></TextField>
                        <Button variant="contained" color="primary" className={classes.button}>Login</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;
