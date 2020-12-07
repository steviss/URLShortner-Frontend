import React from 'react';
import { PageWrapper } from '@layout';
import { loginPageStyle } from '@styles';
import { ChangePasswordForm } from '@components';
import { Container, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

export const ChangePasswordPage: React.FC = () => {
    const history = useHistory();
    const { token } = useParams<{ token: string }>();
    const loginPageCSS = loginPageStyle();
    if (!token) {
        history.push('/');
    }
    return (
        <PageWrapper pageClass={loginPageCSS.root} defaultWrap={false}>
            <Container maxWidth="lg" className={loginPageCSS.container}>
                <Grid className={loginPageCSS.grid}>
                    <ChangePasswordForm token={token} />
                </Grid>
            </Container>
        </PageWrapper>
    );
};
