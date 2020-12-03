export interface CollectionType {
    id: string;
    name: string;
    ownerdId: string;
    //These are just visible by the database
    //owner: User;
    //createdAt: string;
    //updatedAt: string;
}

export interface CreateCollectionFormType {
    url: string;
    slug: string;
}

export interface UpdateCollectionFormType {
    id: string;
    slug: string;
}
