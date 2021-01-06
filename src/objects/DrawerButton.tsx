import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

export const DrawerButton: React.FC<any & { label: string; icon: React.ReactElement }> = ({ label, icon, ...props }) => {
    return (
        <ListItem button {...props}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>
                <Typography>Logout</Typography>
            </ListItemText>
        </ListItem>
    );
};
