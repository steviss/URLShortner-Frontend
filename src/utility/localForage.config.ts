import localforage from 'localforage';
import { config } from './config';

export const localForageConfig = {
    driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: config.__APP_NAME__,
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'claim_store', // Should be alphanumeric, with underscores.
    description: 'Store for unclaimed redirects.',
} as LocalForageOptions;
