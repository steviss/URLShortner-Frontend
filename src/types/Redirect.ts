import { ClickType } from './Click';

export interface RedirectType {
    id: string;
    slug: string;
    url: string;
    ownerId: string;
    clicks: ClickType[];
    createdAt: Date;
    //These are just visible by the database
    //owner: User;
    //createdAt: string;
    //updatedAt: string;
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
