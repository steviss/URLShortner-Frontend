import React from 'react';
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from '@material-ui/core';
import { EnhancedTableHeadProps, TableHeadCell } from '../types';

export function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T, TableHeadCell<T>>) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
    const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
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
                {((headCells as unknown[]) as TableHeadCell<T>[]).map((headCell, i) => (
                    <TableCell key={`${headCell.id}`} align={i === 0 ? 'left' : 'right'} padding={headCell.disablePadding ? 'none' : 'default'} sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id as keyof T)}>
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
}
