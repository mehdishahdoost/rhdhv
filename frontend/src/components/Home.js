import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Recommendation from "./Recommendation";
import CarCard from "./CarCard";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Pagination from '@material-ui/lab/Pagination';
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cardPanel: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    recommendation: {
        marginTop: "40px"
    }
}));

function Home(props) {
    const classes = useStyles();
    function pageHandler(event, value) {

    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={3} className={classes.recommendation}>
                <Paper className={classes.paper}>
                    <Recommendation/>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Paper className={classes.paper}>
                    <div className={classes.cardPanel}>
                        {props.cars.length > 0 && props.cars.map(val => {
                            return <CarCard car={val}/>
                        })}
                    </div>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{minWidth: '100vh'}}
                    >
                        <Grid item xs={12}>
                            <Pagination count={props.totalPage} color="secondary" onChange={pageHandler}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

function mapStateToProps(state) {
    return {cars: state.cars, totalPage: state.totalPage}
}

export default connect(mapStateToProps)(Home);
