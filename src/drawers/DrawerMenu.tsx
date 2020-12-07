import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import { ReactElement } from 'react';
import { RouteType } from '@routes';
import { useHistory } from 'react-router-dom';

interface RouteLinkProps {
    icon?: ReactElement;
    primary: string;
    to: string;
    onClick: () => void;
}

interface DrawerMenuProps {
    routes: RouteType[];
    className?: string;
    closeMenu: () => void;
}
export const RouteLink = (props: RouteLinkProps) => {
    const { icon, primary, to, onClick } = props;
    const history = useHistory();
    const redirect = () => {
        onClick();
        history.push(to);
    };
    return (
        <li>
            <ListItem button onClick={() => redirect()}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ routes, className = '', closeMenu, children }) => {
    const renderRoutes = () => {
        return routes.map((route, i) => {
            return <RouteLink key={i} to={route.path} primary={route.title} icon={route.icon} onClick={closeMenu} />;
        });
    };
    return (
        <Paper elevation={0} className={className}>
            <List>
                {renderRoutes()}
                {children}
            </List>
        </Paper>
    );
};
