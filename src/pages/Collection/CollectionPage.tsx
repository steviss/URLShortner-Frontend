import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { PageHeader, PageWrapper } from '@layout';
import { dashboardPageStyle } from '@styles';
import { ClickRedirectLinks, TotalClicksPie } from '@components';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import AddIcon from '@material-ui/icons/Add';
import { AddRedirectModal } from '@modal';
import { useParams } from 'react-router-dom';

export const CollectionPage: React.FC = observer(() => {
    let { id } = useParams<{ id: string }>();
    const dashboardPageCSS = dashboardPageStyle();
    const [redirectOpen, setRedirectOpen] = useState<boolean>(false);
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
                            Collection ID: {id}
                        </Typography>
                        <Box className={dashboardPageCSS.headerActionButtons}>
                            <Button className={dashboardPageCSS.addButton} startIcon={<AddIcon />} onClick={() => setRedirectOpen(true)}>
                                Create Redirect
                            </Button>
                        </Box>
                        <AddRedirectModal open={redirectOpen} handleClose={() => setRedirectOpen(false)} />
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
