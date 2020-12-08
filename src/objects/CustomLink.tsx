import React from 'react';
import { Link, Typography, LinkProps } from '@material-ui/core';
import { linkStyle } from '@styles';

export const CustomLink: React.FC<LinkProps & { label: string }> = ({ label, ...props }) => {
    const linkObjectCSS = linkStyle();
    return (
        <Link className={linkObjectCSS.root} {...props}>
            {props.children}
            <Typography className={linkObjectCSS.label}>{label}</Typography>
        </Link>
    );
};
