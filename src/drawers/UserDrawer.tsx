import React from 'react';
import { observer } from 'mobx-react';
import { Drawer } from '@material-ui/core';
import { useStore } from '@stores';
import { drawerStyle } from '@styles';

export const UserDrawer: React.FC = observer(() => {
    const {
        layoutStore: { userDrawerState },
    } = useStore();
    const drawerCSS = drawerStyle();
    return <Drawer anchor="right" classes={drawerCSS} open={userDrawerState} />;
});
