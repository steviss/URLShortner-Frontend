import React, { useState } from 'react';
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
import CropFreeIcon from '@material-ui/icons/CropFree';
import { DeleteRedirectModal, QrCodeRedirectModal } from '@modal';
import { DeleteModalInitType } from 'modal/DashboardPage/DeleteRedirectModal';
import { RTSkeleton } from '@skeletons';

export const RedirectTable: React.FC = observer(() => {
    const redirectTableCSS = redirectTableStyle();
    let [deleteModal, deleteModalToggle] = useState<boolean>(false);
    let [deleteRedirect, setDeleteRedirect] = useState<DeleteModalInitType | null>(null);
    let [qrModal, qrModalToggle] = useState<boolean>(false);
    let [qrUrl, setQrUrl] = useState<string | null>(null);
    const {
        redirectStore: { items },
    } = useStore();
    const openQrModal = (url: string) => {
        qrModalToggle(true);
        setQrUrl(url);
    };

    const openDeleteRedirect = (redirect: DeleteModalInitType) => {
        deleteModalToggle(true);
        setDeleteRedirect(redirect);
    };
    return (
        //dodati dashboard store i paginaciju
        // povezati tabele i grafikon da rade na 5 komada
        <Zoom in={true} unmountOnExit mountOnEnter>
            <Grid item xs={12} className={redirectTableCSS.root}>
                {items.length > 0 ? (
                    <TableContainer square component={Paper}>
                        <Table className={redirectTableCSS.table} aria-label="simple table">
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
                                        <TableCell align="right">{new Date(row.createdAt).toLocaleString() || 'Now.'}</TableCell>
                                        <TableCell align="right">{row.clicks.length > 0 ? new Date(row.clicks[0].createdAt).toLocaleString() : 'None.'}</TableCell>
                                        <TableCell align="right">{row.clicks.length || 'None.'}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="qrcode" onClick={() => openQrModal(row.slug)}>
                                                <CropFreeIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => openDeleteRedirect({ slug: row.slug, url: row.url, clicks: row.clicks.length, id: row.id })}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <DeleteRedirectModal redirect={deleteRedirect} open={deleteModal} handleClose={() => deleteModalToggle(false)} />
                            <QrCodeRedirectModal url={qrUrl} open={qrModal} handleClose={() => qrModalToggle(false)} />
                        </Table>
                    </TableContainer>
                ) : (
                    <RTSkeleton />
                )}
            </Grid>
        </Zoom>
    );
});
