import React from 'react';
import { observer } from 'mobx-react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { config } from '@utility/config';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStore } from '@stores';
import { useHistory } from 'react-router-dom';
import { buttonObjectStyle, topHeaderStyle } from '@styles';

export const TopHeader: React.FC = observer(() => {
    const topHeaderCSS = topHeaderStyle();
    const {
        layoutStore: { toggleMenuDrawerState, toggleUserDrawerState },
        userStore: { userLoggedIn },
    } = useStore();
    const history = useHistory();
    const buttonObjectCSS = buttonObjectStyle();
    return (
        <AppBar position="sticky" className={topHeaderCSS.topBar}>
            <Toolbar className={topHeaderCSS.root}>
                <IconButton edge="start" className={topHeaderCSS.menuButton} color="inherit" aria-label="menu" onClick={toggleMenuDrawerState}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h4" className={topHeaderCSS.logo}>
                    {config.__APP_NAME__}
                </Typography>
                {userLoggedIn ? (
                    <IconButton edge="start" className={topHeaderCSS.userButton} color="inherit" aria-label="menu" onClick={toggleUserDrawerState}>
                        <AccountCircleIcon />
                    </IconButton>
                ) : (
                    <Button
                        className={buttonObjectCSS.root}
                        onClick={() => {
                            history.push('/login');
                        }}
                        endIcon={<LockOpenIcon />}
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
});