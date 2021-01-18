import { RedirectType } from './Redirect';

export interface CollectionType {
    id: string;
    name: string;
    ownerdId: string;
    //These are just visible by the database
    //owner: User;
    createdAt: Date;
    clicks: number;
    redirects: RedirectType[];
    //updatedAt: string;
}

export interface CollectionStrippedType {
    id: string;
    name: string;
}

export interface CreateCollectionFormType {
    name: string;
}

export interface UpdateCollectionFormType {
    id: string;
    name: string;
}

export interface DeleteCollectionFormType {
    confirm: boolean;
    id: string;
}

export interface DeleteCollectionMessageType {
    id: string;
    status: string;
    message: string;
}
