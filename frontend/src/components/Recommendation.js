import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as React from "react";
import {CarServiceClient} from "../proto/car_grpc_web_pb";
import {RecommendationRequest} from "../proto/car_pb";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '20px'
    },
    input: {
        marginTop: '20px'
    }
}));

function Recommendation(props) {
    const classes = useStyles();
    const srv = new CarServiceClient(process.env.REACT_APP_ENVOY_PROXY_URL)
    const [filter, setFilter] = React.useState({
        distance: 0,
        fuelPrice: 0
    })

    function distanceHandler(evt) {
        setFilter({
            distance: evt.target.value,
            fuelPrice: filter.fuelPrice
        })
    }

    function fuelPriceHandler(evt) {
        setFilter({
            distance: filter.distance,
            fuelPrice: evt.target.value
        })
    }

    function recommendHandler() {
        let request = new RecommendationRequest();
        request.setFuelprice(filter.fuelPrice);
        request.setMonthlydistance(filter.distance);
        request.setPgsize(5)
        request.setPgnum(1)
        srv.getRecommendationCars(request, {}, (err, response) => {
            if (err != null) {
                console.log(err)
            } else {
                props.dispatch({
                    type: "FETCH_CARS",
                    payload: {
                        totalPage: response.array[0],
                        cars: response.array[1]
                    }
                })
            }
        })
    }

    return (
        <div>
            <span>
                Find cars with the lowest total annual cost over a 4 years in the market
            </span>
            <TextField onChange={distanceHandler} label="Km/Month" className={classes.input}></TextField>
            <TextField onChange={fuelPriceHandler} label="Fuel €/L" className={classes.input}></TextField>
            <Button onClick={recommendHandler} variant="contained" color="primary" className={classes.button}>
                Recommend
            </Button>
        </div>
    )
}
export default connect()(Recommendation);
