import React from 'react';
import { observer } from 'mobx-react';
import { Drawer } from '@material-ui/core';
import { useStore } from '@stores';
import { drawerStyle } from '@styles';

export const MenuDrawer: React.FC = observer(() => {
    const {
        layoutStore: { menuDrawerState },
    } = useStore();
    const drawerCSS = drawerStyle();
    return <Drawer anchor="left" classes={drawerCSS} open={menuDrawerState} />;
});
