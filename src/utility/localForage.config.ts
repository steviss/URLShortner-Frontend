import localforage from 'localforage';
import { config } from './config';

export const localForageConfig = {
    driver: localforage.INDEXEDDB,
    name: config.__APP_NAME__,
    version: 1.0,
    size: 4980736,
    storeName: 'claim_store',
    description: 'Store for unclaimed redirects.',
} as LocalForageOptions;
