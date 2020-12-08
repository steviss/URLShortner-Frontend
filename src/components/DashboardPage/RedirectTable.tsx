import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, IconButton, Zoom } from '@material-ui/core';
import { redirectTableStyle } from '@styles';
import { useStore } from '@stores';
import { observer } from 'mobx-react';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteRedirectModal, QrCodeRedirectModal } from '@modal';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { DeleteModalInitType } from 'modal/DashboardPage/DeleteRedirectModal';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const RedirectTable: React.FC = observer(() => {
    const classes = useStyles();
    const redirectTableCSS = redirectTableStyle();
    let [deleteId, setDeleteId] = useState<DeleteModalInitType | null>(null);
    let [qrcodeUrl, setQrCode] = useState<string | null>(null);
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
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row, i) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.url}
                                    </TableCell>
                                    <TableCell align="right">{row.slug}</TableCell>
                                    <TableCell align="right">{row.createdAt || 'Now.'}</TableCell>
                                    <TableCell align="right">{row.clicks.length > 0 ? row.clicks[0].createdAt : 'None.'}</TableCell>
                                    <TableCell align="right">{row.clicks.length || 'None.'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="qrcode" onClick={() => setQrCode(row.slug)}>
                                            <CropFreeIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => setDeleteId({ name: row.slug, url: row.url, clicks: row.clicks.length, id: row.id })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <DeleteRedirectModal redirect={deleteId} open={!!deleteId} handleClose={() => setDeleteId(null)} />
                        <QrCodeRedirectModal url={qrcodeUrl} open={!!qrcodeUrl} handleClose={() => setQrCode(null)} />
                    </Table>
                </TableContainer>
            </Grid>
        </Zoom>
    );
});
