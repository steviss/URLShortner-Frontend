import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { Form, Formik } from 'formik';

const ShortenForm: React.FC = () => {
    return (
        <Box>
            <Paper>
                <Formik initialValues={{ id: '' }} onSubmit={async (values, { setSubmitting }) => {}}>
                    <Form>test</Form>
                </Formik>
            </Paper>
        </Box>
    );
};

export default ShortenForm;
