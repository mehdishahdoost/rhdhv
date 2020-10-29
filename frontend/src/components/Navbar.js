import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core";
import {AccountCircle, AddRounded} from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
    link: {
        color: "white",
        textDecorationLine: "none"
    },
    select: {
        '&:before': {
            borderColor: "white",
        },
        '&:after': {
            borderColor: "white",
        },
        color: "white"
    },
    icon: {
        fill: "white",
    },
}));

function Navbar() {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/" className={classes.link}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            CarDealer
                        </Typography>
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <FormControl className={classes.formControl}>
                        <Select
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                           defaultValue="-"
                           value="-"
                        >
                            <option value="-">-</option>
                            <option value="brand">By Time</option>
                            <option value="brand">By Brand</option>
                        </Select>
                    </FormControl>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <Link to="/addCar">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<AddRounded/>

                                }
                            >
                                Add Car
                            </Button>
                        </Link>

                        <Link to="/login">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AccountCircle/>
                            }
                        >
                            Login
                        </Button>
                       </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
