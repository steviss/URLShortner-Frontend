import { DeleteResponse, ForgotPasswordResponse, LogoutResponse, PaginatedResponse, ResponseDataType } from '../types/Response';
import { UserType, UserPermissions } from '../types/User';
import { ApiCalls } from './ApiCalls';
import BaseStore from './BaseStore';
import { ClaimRedirectFormType, CreateRedirectFormType, RedirectType, UpdateRedirectFormType } from '../types/Redirect';
import { AddressType, ClickType } from '../types/Click';
import { v4 } from 'uuid';
import { CollectionStrippedType, CollectionType } from '../types/Collection';
import faker from 'faker';

const fakeRedirects = [] as RedirectType[];

const fakerClicks = (size: number): ClickType[] => {
    return Array.from(new Array(size)).map(() => {
        let tempAddress = Object.assign({
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude(),
            country: faker.address.country(),
            county: faker.address.county(),
            state: faker.address.state(),
        }) as AddressType;
        return Object.assign({
            id: faker.random.uuid(),
            address: tempAddress,
            refferer: faker.internet.url(),
            createdAt: faker.date.past(),
        }) as ClickType;
    }) as ClickType[];
};

const fakerRedirects = (size: number): RedirectType[] => {
    return Array.from(new Array(size)).map(() => {
        let id = faker.random.uuid(),
            clicks = Math.floor(Math.random() * 100) + 1,
            temp = Object.assign({
                id,
                slug: faker.random.word(),
                url: faker.internet.url(),
                createdAt: faker.date.past(),
                ownerId: faker.random.uuid(),
                clicks: fakerClicks(clicks),
                collections: [] as CollectionType[],
            }) as RedirectType;
        fakeRedirects.push(temp);
        return temp;
    }) as RedirectType[];
};

const fakerCollections = (size: number): CollectionType[] => {
    return Array.from(new Array(size)).map(() => {
        let id = faker.random.uuid();
        return Object.assign({
            id,
            name: faker.random.word(),
            url: faker.internet.url(),
            createdAt: faker.date.past(),
            ownerId: faker.random.uuid(),
            clicks: faker.random.number(),
            redirects: [] as RedirectType[],
        }) as CollectionType;
    }) as CollectionType[];
};

export class MockStore extends BaseStore implements ApiCalls {
    mockUser: UserType = { id: '2e8e9194-ae43-41c4-b05b-bace482ae8da', email: 'test@test.com' };
    mockRedirects: RedirectType[] = fakerRedirects(150);
    mockCollections: CollectionType[] = fakerCollections(50);
    register = () => {
        return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'Succesfully created an account!', data: this.mockUser });
    };
    login = () => {
        return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'Succesfully logged in account!', data: this.mockUser });
    };
    forgotPassword = () => {
        return Promise.resolve<ResponseDataType<ForgotPasswordResponse>>({ status: 'success', message: 'Succesfully sent an forgot password!' });
    };
    changePassword = () => {
        return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'Succesfully created an account!' });
    };
    //User Calls
    logout = () => {
        this.rootStore.userStore.setLoggedIn(UserPermissions.Guest);
        return Promise.resolve<ResponseDataType<LogoutResponse>>({ status: 'success', message: 'Succesfully logged out!', data: { loggedOut: true } });
    };
    me = () => {
        if (this.rootStore.userStore.userPermissions > UserPermissions.Guest) {
            return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'User authed!', data: this.mockUser });
        } else {
            return Promise.resolve<ResponseDataType<UserType>>({ status: 'error', message: 'User not authed!', data: {} as UserType });
        }
    };
    //Redirect Api Calls
    claimRedirect = (arg: ClaimRedirectFormType) => {
        return Promise.resolve<ResponseDataType<RedirectType>>({
            status: 'success',
            message: 'Succesfully claimed a Redirect!',
            data: { id: arg.id, slug: '', url: '', clicks: [] as ClickType[], collections: [] as CollectionStrippedType[], ownerId: this.mockUser.id, createdAt: new Date() },
        });
    };
    createRedirect = (arg: CreateRedirectFormType) => {
        return Promise.resolve<ResponseDataType<RedirectType>>({
            status: 'success',
            message: 'Succesfully created a Redirect!',
            data: { id: v4(), slug: arg.slug, url: arg.url, clicks: [] as ClickType[], collections: [] as CollectionStrippedType[], ownerId: this.mockUser.id, createdAt: new Date() },
        });
    };
    readRedirect = () => {
        return Promise.resolve<ResponseDataType<RedirectType>>({ status: 'success', message: 'Succesfully read a Redirect!' });
    };
    updateRedirect = (arg: UpdateRedirectFormType) => {
        return Promise.resolve<ResponseDataType<RedirectType>>({
            status: 'success',
            message: 'Succesfully updated a Redirect!',
            data: { id: arg.id, slug: arg.slug, url: '', clicks: [] as ClickType[], collections: [] as CollectionStrippedType[], ownerId: this.mockUser.id, createdAt: new Date() },
        });
    };
    deleteRedirect = () => {
        this.rootStore.notificationStore.createNotification('success', 'Succesfully deleted a redirect.');
        return Promise.resolve<ResponseDataType<DeleteResponse>>({ status: 'success', message: 'Succesfully deleted a Redirect!', data: { deleted: true } });
    };
    //Collection Api Calls
    createCollection = () => {
        return Promise.resolve<ResponseDataType<CollectionType>>({ status: 'success', message: 'Succesfully created a Collection!' });
    };
    readCollection = () => {
        return Promise.resolve<ResponseDataType<CollectionType>>({ status: 'success', message: 'Succesfully read a Collection!' });
    };
    updateCollection = () => {
        return Promise.resolve<ResponseDataType<CollectionType>>({ status: 'success', message: 'Succesfully updated a Collection!' });
    };
    deleteCollection = () => {
        return Promise.resolve<ResponseDataType<DeleteResponse>>({ status: 'success', message: 'Succesfully deleted a Collection!' });
    };
    //User Api Calls
    readUserRedirects = () => {
        this.rootStore.notificationStore.createNotification('success', 'Succesfully retrieved all user redirects.');
        return Promise.resolve<ResponseDataType<PaginatedResponse<RedirectType[]>>>({
            status: 'success',
            message: 'Succesfully retrieved all user redirects.',
            data: { items: this.mockRedirects, hasMore: false, total: this.mockRedirects.length },
        });
    };
    readUserCollections = () => {
        this.rootStore.notificationStore.createNotification('success', 'Succesfully retrieved all user collections.');
        return Promise.resolve<ResponseDataType<PaginatedResponse<CollectionType[]>>>({
            status: 'success',
            message: 'Succesfully retrieved all user collections.',
            data: { items: this.mockCollections, hasMore: false, total: this.mockCollections.length },
        });
    };
}
