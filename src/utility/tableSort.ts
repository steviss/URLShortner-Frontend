import { TableOrder } from '../types';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (orderBy === 'createdAt' || orderBy === 'lastClickedAt') {
        let tempA = new Date((a[orderBy] as unknown) as Date).getTime();
        let tempB = new Date((b[orderBy] as unknown) as Date).getTime();
        return tempA - tempB;
    }
    if (orderBy === 'collections') {
        let tempA = ((a[orderBy] as unknown) as any[]).length;
        let tempB = ((b[orderBy] as unknown) as any[]).length;
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

export function getComparator<T, Key extends keyof any>(
    order: TableOrder,
    orderBy: Key,
): (a: { [key in Key]: number | string | Date | null | T }, b: { [key in Key]: number | string | Date | null | T }) => number {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
