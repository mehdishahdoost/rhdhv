import './App.css';
import Navbar from "./components/Navbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import AddCar from "./components/AddCar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        paddingTop: '10px'
    }
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
            <Navbar/>
            <div className={classes.margin}>
                <div className={classes.root}>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/addCar" component={AddCar} />
                </div>
            </div>
        </Router>
    );
}
export default App;
