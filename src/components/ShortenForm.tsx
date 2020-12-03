import React from 'react';
import { Box, Button, Divider, Paper, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { InputField, ProgressIndicator } from '@objects';
import { buttonStyle, shortenFormStyle } from '@styles';
import ShortTextIcon from '@material-ui/icons/ShortText';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { sleep } from '@utility/sleep';
import { CreateRedirectFormType } from '../types/Redirect';
import { observer } from 'mobx-react';

const validationSchema = Yup.object({
    slug: Yup.string()
        .trim()
        .matches(/^[\w-]+$/i),
    url: Yup.string().trim().url('Must be a valid URL').required('URL is required in order to shorten it.'),
});

export const ShortenForm: React.FC = observer(() => {
    const buttonObjectCSS = buttonStyle();
    const shortenFormCSS = shortenFormStyle();
    const initialValues: CreateRedirectFormType = { url: '', slug: '' };
    const {
        apiStore: { createRedirect },
    } = useStore();
    return (
        <Paper square className={shortenFormCSS.formPaper}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await sleep(3000);
                    await createRedirect(values);
                    setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={shortenFormCSS.form}>
                        <div className={shortenFormCSS.textFieldContainer}>
                            <InputField id="url" label="Enter URL" variant="outlined" className={shortenFormCSS.textField} placeholder="Enter your url here..." />
                            {isSubmitting ? (
                                <Box className={shortenFormCSS.progressLoader}>
                                    <ProgressIndicator />
                                </Box>
                            ) : null}
                        </div>
                        <Button
                            disabled={isSubmitting}
                            className={`${shortenFormCSS.button} ${buttonObjectCSS.root}`}
                            onClick={submitForm}
                            endIcon={<ShortTextIcon className={buttonObjectCSS.icon} />}
                        >
                            <Typography className={buttonObjectCSS.label}>Shorten</Typography>
                        </Button>
                    </Form>
                )}
            </Formik>
            <Divider />
            <Box className={shortenFormCSS.tos}>
                <Typography align="center" variant="caption">
                    By using our service you accept the{' '}
                    <Link key="terms" to={'/terms'} className={shortenFormCSS.tosLinks}>
                        Terms
                    </Link>{' '}
                    and{' '}
                    <Link key="privacy" to={'/privacy'} className={shortenFormCSS.tosLinks}>
                        Privacy
                    </Link>
                    .
                </Typography>
            </Box>
        </Paper>
    );
});
