import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Zoom } from '@material-ui/core';
import { redirectTableStyle } from '@styles';
import { useStore } from '@stores';
import { observer } from 'mobx-react';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const RedirectTable: React.FC = observer(() => {
    const classes = useStyles();
    const redirectTableCSS = redirectTableStyle();
    const {
        redirectStore: { items },
    } = useStore();
    return (
        <Zoom in={items.length > 0}>
            <Grid item xs={12} className={redirectTableCSS.root}>
                <TableContainer square component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>URL</TableCell>
                                <TableCell align="right">Slug</TableCell>
                                <TableCell align="right">Created</TableCell>
                                <TableCell align="right">Last Clicked</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row, i) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.url}
                                    </TableCell>
                                    <TableCell align="right">{row.slug}</TableCell>
                                    <TableCell align="right">{row.createdAt}</TableCell>
                                    <TableCell align="right">{row.clicks[0].createdAt}</TableCell>
                                    <TableCell align="right">{row.clicks.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Zoom>
    );
});
