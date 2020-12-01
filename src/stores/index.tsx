import React, { createContext, useContext } from 'react';
import { RootStore, rootStore } from './RootStore';

export const StoreContext = createContext<RootStore>(rootStore);
export const StoreProvider: React.FC = ({ children }) => {
    return <StoreContext.Provider value={new RootStore()}>{children}</StoreContext.Provider>;
};
export const useStore = (): RootStore => useContext(StoreContext);

export default { StoreContext, StoreProvider, useStore } as const;
