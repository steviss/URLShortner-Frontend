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
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import { DeleteCollectionModal, DeleteCollectionModalInitType } from '@modal';
import { RTSkeleton } from '@skeletons';
import { Skeleton, Zoom, Grid } from '@material-ui/core';
import { betterTableToolbarStyles, betterRedirectTableStyle } from '@styles';
import { getComparator, stableSort } from '@utility/tableSort';
import { EnhancedTableToolbarProps, TableCollectionType, TableHeadCell, TableOrder } from '../../types';
import { useHistory } from 'react-router-dom';
import { EnhancedTableHead } from '@components';

const headCells: TableHeadCell<TableCollectionType>[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
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
    {
        id: 'totalRedirects',
        numeric: true,
        disablePadding: false,
        label: 'Total Redirects',
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
                    Collections
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

export const CollectionTable: React.FC = observer(() => {
    const betterRedirectTableCSS = betterRedirectTableStyle();
    const [order, setOrder] = useState<TableOrder>('asc');
    const [orderBy, setOrderBy] = useState<keyof TableCollectionType>('createdAt');
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {
        collectionStore: { tableItems, totalCollections, loadedCollections, getCollections, loadingCollections },
    } = useStore();
    let [deleteModal, deleteModalToggle] = useState<boolean>(false);
    let [deleteCollection, setDeleteRedirect] = useState<DeleteCollectionModalInitType | null>(null);
    let currentPage = stableSort<TableCollectionType>(tableItems, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const history = useHistory();
    const viewCollection = (event: React.MouseEvent<unknown>, id: string) => {
        event.stopPropagation();
        history.push(`/collection/${id}`);
    };
    const openDeleteCollection = (event: React.MouseEvent<unknown>, redirect: DeleteCollectionModalInitType) => {
        event.stopPropagation();
        deleteModalToggle(true);
        setDeleteRedirect(redirect);
    };
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TableCollectionType) => {
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
            if (pageNextItems > loadedCollections && loadedCollections !== totalCollections) {
                getCollections(loadedCollections, pageNextItems - loadedCollections);
            }
        }
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        let rowsPerPage: number = parseInt(event.target.value, 10);
        if (rowsPerPage > loadedCollections) {
            getCollections(loadedCollections, rowsPerPage - loadedCollections);
        }
        setRowsPerPage(rowsPerPage);
        setPage(0);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCollections) : 0;
    const loadingMoreRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - loadedCollections) - emptyRows : 0;
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
                                <EnhancedTableHead<TableCollectionType>
                                    headCells={headCells}
                                    classes={betterRedirectTableCSS}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={totalCollections}
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
                                                <TableCell align="left">{row.name}</TableCell>
                                                <TableCell align="right">{new Date(row.createdAt as Date).toLocaleString() || 'Now.'}</TableCell>
                                                <TableCell align="right">{row.lastClickedAt ? new Date(row.lastClickedAt).toLocaleString() : 'None.'}</TableCell>
                                                <TableCell align="right">{row.totalClicks || 'None.'}</TableCell>
                                                <TableCell align="right">{row.totalRedirects || 'None.'}</TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="View Link">
                                                        <IconButton aria-label="viewredirect" onClick={(event) => viewCollection(event, row.id as string)}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Redirect">
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={(event) =>
                                                                openDeleteCollection(event, {
                                                                    name: row.name as string,
                                                                    lastClickedAt: row.lastClickedAt ? new Date(row.lastClickedAt).toLocaleString() : 'None.',
                                                                    clicks: row.totalClicks,
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
                                    {emptyRows > 0 && !loadingCollections && (
                                        <TableRow
                                            style={{
                                                height: 81 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={8} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <DeleteCollectionModal collection={deleteCollection} open={deleteModal} handleClose={() => deleteModalToggle(false)} />
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={totalCollections}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ disabled: loadingCollections || emptyRows > 0 || totalCollections <= rowsPerPage || totalCollections <= (page + 1) * rowsPerPage }}
                            backIconButtonProps={{ disabled: loadingCollections || page === 0 }}
                        />
                    </Paper>
                ) : (
                    <RTSkeleton />
                )}
            </Grid>
        </Zoom>
    );
});
