import React from 'react';
import { Button, Typography, ButtonProps } from '@material-ui/core';
import { buttonStyle } from '@styles';

export const CustomButton: React.FC<ButtonProps & { label: string }> = ({ label, ...props }) => {
    const buttonObjectCSS = buttonStyle();
    return (
        <Button className={buttonObjectCSS.root} {...props}>
            <Typography className={buttonObjectCSS.label}>{label}</Typography>
        </Button>
    );
};
