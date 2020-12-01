import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './RootStore';
import BaseStore from './BaseStore';

export class LayoutStore extends BaseStore {
    userLoggedIn: boolean = false;
    coverVisible: boolean = false;
    coverClick: Function = Function;
    clientWindowWidth: number = 0;
    clientWindowHeight: number = 0;
    mediaBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hd' | false = false;
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            setMediaBreakpoint: action,
            mediaBreakpointUp: action,
            mediaBreakpointDown: action,
            setWindowWidth: action,
            setWindowHeight: action,
            toggleScrolling: action,
            userLoggedIn: observable,
            coverVisible: observable,
            coverClick: observable,
            clientWindowHeight: observable,
            clientWindowWidth: observable,
            mediaBreakpoint: observable,
        });
    }
    setMediaBreakpoint = (val: number) => {
        if (val <= 480) {
            return 'xs';
        } else if (val < 720) {
            return 'sm';
        } else if (val < 1024) {
            return 'md';
        } else if (val <= 1440) {
            return 'lg';
        } else if (val <= 1600) {
            return 'xl';
        } else if (val > 1600) {
            return 'hd';
        } else {
            return false;
        }
    };
    mediaBreakpointUp = (val: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hd') => {
        let mediaQueries = ['xs', 'sm', 'md', 'lg', 'xl', 'hd'];
        let currentQuery = this.mediaBreakpoint ? mediaQueries.indexOf(this.mediaBreakpoint) : this.mediaBreakpoint;
        let targetQuery = mediaQueries.indexOf(val);
        if (currentQuery) {
            return currentQuery >= targetQuery ? true : false;
        }
    };
    mediaBreakpointDown = (val: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hd') => {
        let mediaQueries = ['xs', 'sm', 'md', 'lg', 'xl', 'hd'];
        let currentQuery = this.mediaBreakpoint ? mediaQueries.indexOf(this.mediaBreakpoint) : this.mediaBreakpoint;
        let targetQuery = mediaQueries.indexOf(val);
        if (currentQuery) {
            return currentQuery < targetQuery ? true : false;
        }
    };
    mediaBreakpointBetween = (val1: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hd', val2: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hd') => {
        let mediaQueries = ['xs', 'sm', 'md', 'lg', 'xl', 'hd'];
        let currentQuery = this.mediaBreakpoint ? mediaQueries.indexOf(this.mediaBreakpoint) : this.mediaBreakpoint;
        let targetQueryOne = mediaQueries.indexOf(val1);
        let targetQueryTwo = mediaQueries.indexOf(val2);
        if (currentQuery) {
            return targetQueryOne > currentQuery ? (currentQuery < targetQueryTwo ? true : false) : false;
        }
    };
    setWindowWidth = (val: number) => {
        this.clientWindowWidth = val;
        this.mediaBreakpoint = this.setMediaBreakpoint(val);
    };
    setWindowHeight = (val: number) => {
        this.clientWindowHeight = val;
    };
    toggleScrolling = (arg: boolean) => {
        const body = document.body;
        if (arg) {
            let scrollY = window.scrollY;
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            //body.style.paddingRight = `16px`;
        } else {
            let scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            //body.style.paddingRight = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };
}
