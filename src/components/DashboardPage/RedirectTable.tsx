import React, { useState } from 'react';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { DeleteRedirectModal, QrCodeRedirectModal, DeleteRedirectModalInitType } from '@modal';
import { RTSkeleton } from '@skeletons';
import { Skeleton, Zoom, Grid, AvatarGroup } from '@material-ui/core';
import { betterTableToolbarStyles, betterRedirectTableStyle } from '@styles';
import { getComparator, stableSort } from '@utility/tableSort';
import { EnhancedTableToolbarProps, TableHeadCell, TableOrder, TableRedirectType } from '../../types';
import { useHistory } from 'react-router-dom';
import { EnhancedTableHead } from '@components';

const headCells: TableHeadCell<TableRedirectType>[] = [
    {
        id: 'alias',
        numeric: false,
        disablePadding: false,
        label: 'Alias',
    },
    {
        id: 'url',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'slug',
        numeric: false,
        disablePadding: false,
        label: 'Redirect URL',
    },
    {
        id: 'collections',
        numeric: true,
        disablePadding: false,
        label: 'Collections',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Creation date',
    },
    {
        id: 'lastClickedAt',
        numeric: true,
        disablePadding: false,
        label: 'Last Clicked',
    },
    {
        id: 'totalClicks',
        numeric: true,
        disablePadding: false,
        label: 'Total Clicks',
    },
];

export const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
    const enchancedTableToolbarCSS = betterTableToolbarStyles();
    const { numSelected } = props;
    return (
        <Toolbar
            className={clsx(enchancedTableToolbarCSS.root, {
                [enchancedTableToolbarCSS.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={enchancedTableToolbarCSS.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={enchancedTableToolbarCSS.title} variant="h6" id="tableTitle" component="div">
                    Redirects
                </Typography>
            )}
            {numSelected > 0 ? (
                /* on Click za chain delete */
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export const RedirectTable: React.FC = observer(() => {
    const betterRedirectTableCSS = betterRedirectTableStyle();
    const [order, setOrder] = useState<TableOrder>('asc');
    const [orderBy, setOrderBy] = useState<keyof TableRedirectType>('createdAt');
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {
        redirectStore: { tableItems, totalRedirects, loadedRedirects, getRedirects, loadingRedirects },
    } = useStore();
    let [deleteModal, deleteModalToggle] = useState<boolean>(false);
    let [deleteRedirect, setDeleteRedirect] = useState<DeleteRedirectModalInitType | null>(null);
    let [qrModal, qrModalToggle] = useState<boolean>(false);
    let [qrUrl, setQrUrl] = useState<string | null>(null);
    let currentPage = stableSort<TableRedirectType>(tableItems, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const history = useHistory();
    const openQrModal = (event: React.MouseEvent<unknown>, url: string) => {
        event.stopPropagation();
        qrModalToggle(true);
        setQrUrl(url);
    };
    const viewRedirect = (event: React.MouseEvent<unknown>, id: string) => {
        event.stopPropagation();
        console.log('wololooo');
        history.push(`/collections/${id}`);
    };
    const openDeleteRedirect = (event: React.MouseEvent<unknown>, redirect: DeleteRedirectModalInitType) => {
        event.stopPropagation();
        deleteModalToggle(true);
        setDeleteRedirect(redirect);
    };
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TableRedirectType) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
                return;
            }
            const newSelecteds = currentPage.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        if (page < newPage) {
            let pageNextItems = (newPage + 1) * rowsPerPage;
            if (pageNextItems > loadedRedirects && loadedRedirects !== totalRedirects) {
                getRedirects(loadedRedirects, pageNextItems - loadedRedirects);
            }
        }
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        let rowsPerPage: number = parseInt(event.target.value, 10);
        if (rowsPerPage > loadedRedirects) {
            getRedirects(loadedRedirects, rowsPerPage - loadedRedirects);
        }
        setRowsPerPage(rowsPerPage);
        setPage(0);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalRedirects) : 0;
    const loadingMoreRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - loadedRedirects) - emptyRows : 0;
    const loadingMoreSkeleton = () => {
        return (
            loadingMoreRows > 0 &&
            [...Array(4).keys()].map((_, rowIndex) => {
                return (
                    <TableRow
                        key={rowIndex}
                        style={{
                            height: 81,
                        }}
                    >
                        {[...Array(8).keys()].map((_, index) => {
                            return (
                                <TableCell key={index} align={index > 1 ? 'right' : 'left'}>
                                    <Skeleton style={{ display: 'inline-block' }} variant="text" width="2rem" height="1rem" />
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })
        );
    };
    return (
        <Zoom in={true} unmountOnExit mountOnEnter>
            <Grid item xs={12} className={betterRedirectTableCSS.root}>
                {tableItems.length > 0 ? (
                    <Paper square className={betterRedirectTableCSS.paper}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table className={betterRedirectTableCSS.table} aria-labelledby="tableTitle">
                                <EnhancedTableHead<TableRedirectType>
                                    headCells={headCells}
                                    classes={betterRedirectTableCSS}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={totalRedirects}
                                />
                                <TableBody>
                                    {currentPage.map((row, index) => {
                                        const isItemSelected = isSelected(row.id as string);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event: React.MouseEvent<unknown>) => handleClick(event, row.id as string)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">{row.slug}</TableCell>
                                                <TableCell align="right">{row.url}</TableCell>
                                                <TableCell align="right">{row.slug}</TableCell>
                                                <TableCell align={row.collections.length > 0 ? 'center' : 'right'}>
                                                    {row.collections.length > 0 ? (
                                                        <AvatarGroup max={4}>
                                                            {row.collections.map((collection) => {
                                                                return <Avatar alt={collection.name}>{[...collection.name][0]}</Avatar>;
                                                            })}
                                                        </AvatarGroup>
                                                    ) : (
                                                        <span>None.</span>
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">{new Date(row.createdAt as Date).toLocaleString() || 'Now.'}</TableCell>
                                                <TableCell align="right">{row.lastClickedAt ? new Date(row.lastClickedAt).toLocaleString() : 'None.'}</TableCell>
                                                <TableCell align="right">{row.totalClicks || 'None.'}</TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="View Link">
                                                        <IconButton aria-label="viewredirect" onClick={(event) => viewRedirect(event, row.id as string)}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="View QR Code">
                                                        <IconButton aria-label="qrcode" onClick={(event) => openQrModal(event, row.slug as string)}>
                                                            <CropFreeIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Redirect">
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={(event) =>
                                                                openDeleteRedirect(event, {
                                                                    slug: row.slug as string,
                                                                    url: row.url as string,
                                                                    clicks: row.totalClicks as number,
                                                                    id: row.id as string,
                                                                })
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {loadingMoreSkeleton()}
                                    {emptyRows > 0 && rowsPerPage < 10 && !loadingRedirects && (
                                        <TableRow
                                            style={{
                                                height: 81 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={9} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <DeleteRedirectModal redirect={deleteRedirect} open={deleteModal} handleClose={() => deleteModalToggle(false)} />
                                <QrCodeRedirectModal url={qrUrl} open={qrModal} handleClose={() => qrModalToggle(false)} />
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={totalRedirects}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ disabled: loadingRedirects || emptyRows > 0 }}
                            backIconButtonProps={{ disabled: loadingRedirects || page === 0 }}
                        />
                    </Paper>
                ) : (
                    <RTSkeleton />
                )}
            </Grid>
        </Zoom>
    );
});
