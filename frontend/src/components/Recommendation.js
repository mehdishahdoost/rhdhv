import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '20px'
    },
    input: {
        marginTop: '20px'
    }
}));

function Recommendation() {
    const classes = useStyles();
    return (
        <div>
            <span>
                Find cars with the lowest total annual cost over a 4 years in the market
            </span>
            <TextField label="Km/Month" className={classes.input}></TextField>
            <TextField label="Fuel €/L" className={classes.input}></TextField>
            <Button variant="contained" color="primary" className={classes.button}>
                Recommend
            </Button>
        </div>
    )
}
export default Recommendation;
