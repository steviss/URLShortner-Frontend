import React from 'react';
import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

export const InputField = ({ id, ...props }: TextFieldProps) => {
    const [field, meta] = useField(id!);
    return <TextField id={field.name} name={field.name} helperText={meta.touched ? meta.error : ''} error={meta.touched && !!meta.error} value={field.value} onChange={field.onChange} {...props} />;
};
