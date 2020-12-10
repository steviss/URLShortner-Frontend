import React from 'react';
import { observer } from 'mobx-react';
import { Drawer, IconButton, Typography, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { useStore } from '@stores';
import { drawerStyle, customDrawerStyle } from '@styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import { userFooterRoutesArray, userMenuRoutesArray } from '@routes';
import { DrawerMenu } from './DrawerMenu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const UserDrawer: React.FC = observer(() => {
    const {
        layoutStore: { userDrawerState, toggleUserDrawerState },
        apiStore: { logout },
        userStore: {
            user: { email },
        },
    } = useStore();
    const drawerCSS = drawerStyle();
    const userDrawerCSS = customDrawerStyle();
    return (
        <Drawer anchor="right" classes={drawerCSS} open={userDrawerState} ModalProps={{ onBackdropClick: toggleUserDrawerState }}>
            <header className={userDrawerCSS.userHeader}>
                <Tooltip title={email} aria-label="user email" style={{ cursor: 'help' }}>
                    <AccountCircleIcon />
                </Tooltip>
                <Typography variant="h6" className={userDrawerCSS.h6}>
                    User Menu
                </Typography>
                <IconButton size="small" onClick={toggleUserDrawerState}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </header>
            <DrawerMenu routes={userMenuRoutesArray} closeMenu={toggleUserDrawerState} />
            <DrawerMenu routes={userFooterRoutesArray} className={userDrawerCSS.footerMenu} closeMenu={toggleUserDrawerState}>
                <ListItem
                    button
                    onClick={() =>
                        logout({ logout: true }).then(() => {
                            toggleUserDrawerState();
                            // eslint-disable-next-line no-restricted-globals
                            location.reload();
                        })
                    }
                >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography>Logout</Typography>
                    </ListItemText>
                </ListItem>
            </DrawerMenu>
        </Drawer>
    );
});
