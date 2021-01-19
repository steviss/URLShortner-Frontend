import { betterRedirectTableStyle } from '@styles';
import { CollectionStrippedType } from './Collection';

export interface TableRedirectType {
    id: string;
    alias: string;
    url: string;
    slug: string;
    collections: CollectionStrippedType[];
    createdAt: Date;
    lastClickedAt: Date | null;
    totalClicks: number;
}

export interface TableCollectionType {
    id: string;
    name: string;
    createdAt: Date;
    lastClickedAt: Date | null;
    totalClicks: number;
    totalRedirects: number;
}

export type TableOrder = 'asc' | 'desc';

export interface TableHeadCell<T> {
    disablePadding: boolean;
    id: keyof T;
    label: string;
    numeric: boolean;
}
export interface EnhancedTableHeadProps<T, K> {
    headCells: K[];
    classes: ReturnType<typeof betterRedirectTableStyle>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: TableOrder;
    orderBy: string;
    rowCount: number;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
}
