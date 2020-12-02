import React from 'react';
import { observer } from 'mobx-react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { config } from '@utility/config';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStore } from '@stores';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    userButton: {
        marginLeft: theme.spacing(2),
    },
    logo: {
        position: 'relative',
        textTransform: 'uppercase',
        fontSize: '1.5rem',
        fontWeight: 600,
    },
}));

export const TopHeader: React.FC = observer(() => {
    const classes = useStyles();
    const {
        layoutStore: { userLoggedIn, toggleMenuDrawerState, toggleUserDrawerState },
    } = useStore();
    return (
        <AppBar position="sticky">
            <Toolbar className={classes.root}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleMenuDrawerState}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h4" className={classes.logo}>
                    {config.__APP_NAME__}
                </Typography>
                {userLoggedIn ? (
                    <Button variant="contained" color="secondary" endIcon={<LockOpenIcon />}>
                        Login
                    </Button>
                ) : (
                    <IconButton edge="start" className={classes.userButton} color="inherit" aria-label="menu" onClick={toggleUserDrawerState}>
                        <AccountCircleIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
});
