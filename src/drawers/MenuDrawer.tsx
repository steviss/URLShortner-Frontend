import React from 'react';
import { observer } from 'mobx-react';
import { Drawer, IconButton, Typography } from '@material-ui/core';
import { useStore } from '@stores';
import { customDrawerStyle, drawerStyle } from '@styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import CloseIcon from '@material-ui/icons/Close';
import { DrawerMenu } from './DrawerMenu';
import { publicFooterRoutesArray, publicMenuRoutesArray } from '@routes';
import { UserPermissions } from '../types/User';

export const MenuDrawer: React.FC = observer(() => {
    const {
        layoutStore: { menuDrawerState, toggleMenuDrawerState },
        userStore: { userPermissions },
    } = useStore();
    const drawerCSS = drawerStyle();
    const menuDrawerCSS = customDrawerStyle();
    return (
        <Drawer anchor="left" classes={drawerCSS} open={menuDrawerState} ModalProps={{ onBackdropClick: toggleMenuDrawerState }}>
            <header className={menuDrawerCSS.header}>
                <MenuOpenIcon />
                <Typography variant="h6" className={menuDrawerCSS.h6}>
                    Main Menu
                </Typography>
                <IconButton size="small" onClick={toggleMenuDrawerState}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </header>
            <DrawerMenu routes={publicMenuRoutesArray} closeMenu={toggleMenuDrawerState} />
            {userPermissions !== UserPermissions.User ? <DrawerMenu routes={publicFooterRoutesArray} className={menuDrawerCSS.footerMenu} closeMenu={toggleMenuDrawerState} /> : null}
        </Drawer>
    );
});
