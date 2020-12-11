import React, { useState } from 'react';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { DeleteRedirectModal, QrCodeRedirectModal } from '@modal';
import { DeleteModalInitType } from 'modal/DashboardPage/DeleteRedirectModal';
import { RTSkeleton } from '@skeletons';
import { Skeleton, Zoom, Grid } from '@material-ui/core';
import { betterTableToolbarStyles, betterRedirectTableStyle } from '@styles';

export interface TableRedirectType {
    id: string;
    alias: string;
    url: string;
    slug: string;
    createdAt: Date;
    lastClickedAt: Date | null;
    totalClicks: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (orderBy === 'createdAt' || orderBy === 'lastClickedAt') {
        let tempA = new Date((a[orderBy] as unknown) as Date).getTime();
        let tempB = new Date((b[orderBy] as unknown) as Date).getTime();
        return tempA - tempB;
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string | Date | null }, b: { [key in Key]: number | string | Date | null }) => number {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof TableRedirectType;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
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

interface EnhancedTableProps {
    classes: ReturnType<typeof betterRedirectTableStyle>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableRedirectType) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof TableRedirectType) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell, i) => (
                    <TableCell key={headCell.id} align={i === 0 ? 'left' : 'right'} padding={headCell.disablePadding ? 'none' : 'default'} sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? <span className={classes.sortSpan}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="default" align="right">
                    Action
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

interface EnhancedTableToolbarProps {
    numSelected: number;
}

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

export const EnhancedTable: React.FC = observer(() => {
    const betterRedirectTableCSS = betterRedirectTableStyle();
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof TableRedirectType>('createdAt');
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let [deleteModal, deleteModalToggle] = useState<boolean>(false);
    let [deleteRedirect, setDeleteRedirect] = useState<DeleteModalInitType | null>(null);
    let [qrModal, qrModalToggle] = useState<boolean>(false);
    let [qrUrl, setQrUrl] = useState<string | null>(null);
    const {
        redirectStore: { tableItems, totalRedirects, loadedRedirects, getRedirects, loadingMoreRedirects },
    } = useStore();
    const openQrModal = (event: React.MouseEvent<unknown>, url: string) => {
        event.stopPropagation();
        qrModalToggle(true);
        setQrUrl(url);
    };
    const openDeleteRedirect = (event: React.MouseEvent<unknown>, redirect: DeleteModalInitType) => {
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
            const newSelecteds = tableItems.map((n) => n.slug);
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
                                <EnhancedTableHead
                                    classes={betterRedirectTableCSS}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={totalRedirects}
                                />
                                <TableBody>
                                    {stableSort(tableItems, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
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
                                                    <TableCell align="right">{new Date(row.createdAt).toLocaleString() || 'Now.'}</TableCell>
                                                    <TableCell align="right">{row.lastClickedAt ? new Date(row.lastClickedAt).toLocaleString() : 'None.'}</TableCell>
                                                    <TableCell align="right">{row.totalClicks || 'None.'}</TableCell>
                                                    <TableCell align="right">
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
                                    {emptyRows > 0 && rowsPerPage < 10 && !loadingMoreRedirects && (
                                        <TableRow
                                            style={{
                                                height: 81 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={8} />
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
                            nextIconButtonProps={{ disabled: loadingMoreRedirects }}
                            backIconButtonProps={{ disabled: loadingMoreRedirects }}
                        />
                    </Paper>
                ) : (
                    <RTSkeleton />
                )}
            </Grid>
        </Zoom>
    );
});
