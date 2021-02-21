export interface ClickType {
    id: string;
    referer: string;
    address: AddressType;
    createdAt: Date;
    //redirectId: number;
}

export interface AddressType {
    latitude: number;
    longitude: number;
    country: string;
    county: string;
    state: string;
}
