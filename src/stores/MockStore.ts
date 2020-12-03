import { ResponseDataType } from '../types/Response';
import { UserType } from '../types/User';
import { ApiCalls } from './ApiCalls';
import BaseStore from './BaseStore';

export class MockStore extends BaseStore implements ApiCalls {
    user: UserType = { id: '2e8e9194-ae43-41c4-b05b-bace482ae8da', email: 'test@test.com' };
    register = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    login = () => {
        this.rootStore.userStore.setLoggedIn(true);
        this.rootStore.userStore.setUser(this.user);
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully logged in account!' });
    };
    forgotPassword = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully sent an forgot password!' });
    };
    changePassword = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    //User Calls
    logout = () => {
        this.rootStore.userStore.setLoggedIn(false);
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    userChangePassword = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    me = () => {
        if (this.rootStore.userStore.userLoggedIn) {
            return Promise.resolve<ResponseDataType>({ status: 'success', message: 'User authed!', data: this.user });
        } else {
            return Promise.resolve<ResponseDataType>({ status: 'error', message: 'User not authed!' });
        }
    };
    //Redirect Api Calls
    createRedirect = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created a Redirect!' });
    };
    readRedirect = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully read a Redirect!' });
    };
    updateRedirect = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully updated a Redirect!' });
    };
    deleteRedirect = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully deleted a Redirect!' });
    };
    //Collection Api Calls
    createCollection = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created a Collection!' });
    };
    readCollection = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully read a Collection!' });
    };
    updateCollection = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully updated a Collection!' });
    };
    deleteCollection = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully deleted a Collection!' });
    };
}
