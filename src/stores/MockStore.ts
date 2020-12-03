import { ResponseDataType } from '../types/Response';
import { UserType } from '../types/User';
import { ApiCalls } from './ApiCalls';
import BaseStore from './BaseStore';

export class MockStore extends BaseStore implements ApiCalls {
    userLoggedIn: boolean = false;
    user: UserType = { id: 'lbalblaba', email: 'sdasdsa' };
    register = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    login = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    changePassword = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    //User Calls
    logout = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    userChangePassword = () => {
        return Promise.resolve<ResponseDataType>({ status: 'success', message: 'Succesfully created an account!' });
    };
    me = () => {
        if (this.userLoggedIn) {
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
