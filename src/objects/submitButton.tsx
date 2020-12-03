import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { submitButtonStyle } from '@styles';
import { ProgressIndicator } from './ProgressIndicator';

export const SubmitButton = ({ isSubmitting, type, label, customClass, ...props }: ButtonProps & { isSubmitting: boolean; type: string; label: string; customClass?: string }) => {
    const submitButtonCSS = submitButtonStyle();
    return (
        <Button type={type} className={`${submitButtonCSS.root} ${customClass || ''}`} {...props} disabled={isSubmitting}>
            {isSubmitting ? (
                <Box className={submitButtonCSS.progressContainer}>
                    <ProgressIndicator thickness={4} size={24} topClass={submitButtonCSS.loaderTop} bottomClass={submitButtonCSS.loaderBottom} />
                </Box>
            ) : null}
            <Typography component="span" className={submitButtonCSS.label}>
                {label}
            </Typography>
        </Button>
    );
};
