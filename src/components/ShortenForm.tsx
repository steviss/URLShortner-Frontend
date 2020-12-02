import React from 'react';
import { Box, Button, Divider, Link as LinkMaterial, Paper, TextField, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { ProgressIndicator } from '@objects';
import { buttonObjectStyle, shortenFormStyle } from '@styles';
import ShortTextIcon from '@material-ui/icons/ShortText';
import { Link } from 'react-router-dom';

export const ShortenForm: React.FC = () => {
    const buttonObjectCSS = buttonObjectStyle();
    const shortenFormCSS = shortenFormStyle();
    return (
        <Paper square className={shortenFormCSS.formPaper}>
            <Formik
                initialValues={{}}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    //await callback(values);
                    setSubmitting(false);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={shortenFormCSS.form}>
                        <div className={shortenFormCSS.textFieldContainer}>
                            <TextField id="outlined-basic" label="Enter URL" variant="outlined" className={shortenFormCSS.textField} />
                            {!isSubmitting ? (
                                <Box className={shortenFormCSS.progressLoader}>
                                    <ProgressIndicator />
                                </Box>
                            ) : null}
                        </div>
                        <Button className={`${shortenFormCSS.button} ${buttonObjectCSS.root}`} onClick={submitForm} endIcon={<ShortTextIcon />}>
                            Shorten
                        </Button>
                    </Form>
                )}
            </Formik>
            <Divider />
            <Box className={shortenFormCSS.tos}>
                <Typography align="center" variant="caption">
                    By using our service you accept the{' '}
                    <Link to="/terms" component={LinkMaterial} color="primary">
                        Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" component={LinkMaterial} color="primary">
                        Privacy
                    </Link>
                    .
                </Typography>
            </Box>
        </Paper>
    );
};
