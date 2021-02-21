import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '../RootStore';
import BaseStore from '../BaseStore';
import { TableCollectionType, TableOrder } from '../../types';
import { getComparator, stableSort } from '@utility/tableSort';

export class DashboardPageStore extends BaseStore {
    totalCollections: number = 0;
    loadedCollections: number = 0;
    pageItems: TableCollectionType[] = [];
    currentPage: number = 0;
    rowsPerPage: number = 5;
    order: TableOrder = 'asc';
    orderBy: keyof TableCollectionType = 'createdAt';
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            pageItems: observable,
            totalCollections: observable,
            loadedCollections: observable,
            currentPage: observable,
            rowsPerPage: observable,
            order: observable,
            orderBy: observable,
            handleChangePage: action,
            handleChangeRowsPerPage: action,
        });
    }
    setCurrentPage = () => {
        this.pageItems = stableSort<TableCollectionType>(this.rootStore.collectionStore.tableItems, getComparator(this.order, this.orderBy)).slice(
            this.currentPage * this.rowsPerPage,
            this.currentPage * this.rowsPerPage + this.rowsPerPage,
        );
    };
    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        let rowsPerPage: number = parseInt(event.target.value, 10);
        if (rowsPerPage > this.loadedCollections) {
            this.rootStore.collectionStore.getCollections(this.loadedCollections, rowsPerPage - this.loadedCollections);
        }
        this.rowsPerPage = rowsPerPage;
        this.currentPage = 0;
    };
    handleChangePage = (event: unknown, newPage: number) => {
        if (this.currentPage < newPage) {
            let pageNextItems = (newPage + 1) * this.rowsPerPage;
            if (pageNextItems > this.loadedCollections && this.loadedCollections !== this.totalCollections) {
                this.rootStore.collectionStore.getCollections(this.loadedCollections, pageNextItems - this.loadedCollections);
            }
        }
        this.currentPage = newPage;
    };
}
