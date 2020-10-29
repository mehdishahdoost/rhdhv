import Paper from "@material-ui/core/Paper";
import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '300',
        height: '400'
    },
    table: {
        minWidth: 290,
    }
}));

function CarCard() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <img src="../images/hondafit.jpg" width="200px" alt=""/>
            <TableContainer>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Features</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Model</TableCell>
                            <TableCell>Honda Fit 2020</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Honda</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Y.O.Release</TableCell>
                            <TableCell>2020</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Version</TableCell>
                            <TableCell>2020</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Fuel Consumption</TableCell>
                            <TableCell>1 L/KM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Annual Maintenance</TableCell>
                            <TableCell>200€</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>2249€</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default CarCard;
