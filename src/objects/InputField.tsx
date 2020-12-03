import React from 'react';
import { useField } from 'formik';
import { Box, TextField, TextFieldProps, Tooltip } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { textFieldStyle } from '@styles';

export const InputField = ({ id, customContainerClass, ...props }: TextFieldProps & { customContainerClass?: string }) => {
    const [field, meta] = useField(id!);
    const textFieldCSS = textFieldStyle();
    return (
        <Box className={`${textFieldCSS.root} ${customContainerClass ? customContainerClass : ''}`}>
            <TextField id={field.name} name={field.name} helperText={meta.touched ? meta.error : ''} error={meta.touched && !!meta.error} value={field.value} onChange={field.onChange} {...props} />
            {meta.touched && !!meta.error ? (
                <Box className={textFieldCSS.icon}>
                    <Tooltip title={meta.touched ? meta.error : ''} placement="bottom">
                        <ErrorOutlineIcon />
                    </Tooltip>
                </Box>
            ) : null}
        </Box>
    );
};
