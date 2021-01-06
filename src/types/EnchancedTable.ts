import { betterRedirectTableStyle } from '@styles';

export interface TableRedirectType {
    id: string;
    alias: string;
    url: string;
    slug: string;
    createdAt: Date;
    lastClickedAt: Date | null;
    totalClicks: number;
}

export type TableOrder = 'asc' | 'desc';

export interface TableHeadCell<T> {
    disablePadding: boolean;
    id: keyof T;
    label: string;
    numeric: boolean;
}
export interface EnhancedTableHeadProps {
    classes: ReturnType<typeof betterRedirectTableStyle>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableRedirectType) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: TableOrder;
    orderBy: string;
    rowCount: number;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
}