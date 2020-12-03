import React from 'react';
import { observer } from 'mobx-react';
import { PageWrapper } from '@layout';
import { loginPageStyle } from '@styles';
import { ChangePasswordForm } from '@components';
import { Container, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';

export const ChangePasswordPage: React.FC = observer(() => {
    const { token } = useParams<{ token: string }>();
    const loginPageCSS = loginPageStyle();
    return (
        <PageWrapper pageClass={loginPageCSS.root} defaultWrap={false}>
            <Container maxWidth="lg" className={loginPageCSS.container}>
                <Grid className={loginPageCSS.grid}>
                    <ChangePasswordForm token={token}></ChangePasswordForm>
                </Grid>
            </Container>
        </PageWrapper>
    );
});
