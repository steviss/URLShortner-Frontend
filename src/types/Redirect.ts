import { ClickType } from './Click';
import { CollectionStrippedType } from './Collection';

export interface RedirectType {
    id: string;
    slug: string;
    url: string;
    ownerId: string;
    clicks: ClickType[];
    createdAt: Date;
    collections: CollectionStrippedType[];
    //These are just visible by the database
    //owner: User;
    //createdAt: string;
    //updatedAt: string;
}

export interface ClaimRedirectType {
    claimKey: string;
    id: string;
}

export interface RedirectResponse {
    redirects: RedirectType[];
    hasMore: boolean;
}

export interface CreateRedirectFormType {
    url: string;
    slug: string;
}

export interface UpdateRedirectFormType {
    id: string;
    slug: string;
}

export interface DeleteRedirectFormType {
    confirm: boolean;
    id: string;
}

export interface ClaimRedirectFormType {
    id: string;
    claimKey: string;
}
export interface DeleteRedirectMessageType {
    id: string;
    status: string;
    message: string;
}
