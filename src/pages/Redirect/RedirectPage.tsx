import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { PageHeader, PageWrapper } from '@layout';
import { dashboardPageStyle } from '@styles';
import { ClickRedirectLinks, TotalClicksPie } from '@components';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import { useParams } from 'react-router-dom';

export const RedirectPage: React.FC = observer(() => {
    let { id } = useParams<{ id: string }>();
    const dashboardPageCSS = dashboardPageStyle();
    const {
        redirectStore: { getRedirects },
    } = useStore();
    useEffect(() => {
        getRedirects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <PageHeader className={dashboardPageCSS.header}>
                <Container maxWidth={false} className={dashboardPageCSS.container}>
                    <Grid container justifyContent="space-between" alignItems="center" className={dashboardPageCSS.headerGrid}>
                        <Typography variant="h1" className={dashboardPageCSS.welcomeMessage}>
                            Redirect ID: {id}
                        </Typography>
                    </Grid>
                </Container>
            </PageHeader>
            <PageWrapper pageClass={dashboardPageCSS.root} defaultWrap={false}>
                <Container maxWidth={false} className={dashboardPageCSS.container}>
                    <Grid container className={dashboardPageCSS.grid}>
                        <ClickRedirectLinks />
                        <TotalClicksPie />
                    </Grid>
                </Container>
            </PageWrapper>
        </>
    );
});
