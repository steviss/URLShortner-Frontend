import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { PageHeader, PageWrapper } from '@layout';
import { dashboardPageStyle } from '@styles';
import { ClickRedirectLinks, TotalClicksPie, RedirectTable, CollectionTable } from '@components';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import AddIcon from '@material-ui/icons/Add';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { AddRedirectModal, AddCollectionModal } from '@modal';

export const DashboardPage: React.FC = observer(() => {
    const dashboardPageCSS = dashboardPageStyle();
    const [redirectOpen, setRedirectOpen] = useState<boolean>(false);
    const [collectionOpen, setCollectionOpen] = useState<boolean>(false);
    const {
        redirectStore: { getRedirects },
        collectionStore: { getCollections },
        userStore: { user },
    } = useStore();
    useEffect(() => {
        getRedirects();
        getCollections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <PageHeader className={dashboardPageCSS.header}>
                <Container maxWidth={false} className={dashboardPageCSS.container}>
                    <Grid container justifyContent="space-between" alignItems="center" className={dashboardPageCSS.headerGrid}>
                        <Typography variant="h1" className={dashboardPageCSS.welcomeMessage}>
                            Welcome, {user.email}
                        </Typography>
                        <Box className={dashboardPageCSS.headerActionButtons}>
                            <Button className={dashboardPageCSS.addButton} startIcon={<AddIcon />} onClick={() => setRedirectOpen(true)}>
                                Create Redirect
                            </Button>
                            <Button className={dashboardPageCSS.collectionButton} startIcon={<CreateNewFolderIcon />} onClick={() => setCollectionOpen(true)}>
                                Create Collection
                            </Button>
                        </Box>
                        <AddRedirectModal open={redirectOpen} handleClose={() => setRedirectOpen(false)} />
                        <AddCollectionModal open={collectionOpen} handleClose={() => setCollectionOpen(false)} />
                    </Grid>
                </Container>
            </PageHeader>
            <PageWrapper pageClass={dashboardPageCSS.root} defaultWrap={false}>
                <Container maxWidth={false} className={dashboardPageCSS.container}>
                    <Grid container className={dashboardPageCSS.grid}>
                        <ClickRedirectLinks />
                        <TotalClicksPie />
                        <RedirectTable />
                        <CollectionTable />
                    </Grid>
                </Container>
            </PageWrapper>
        </>
    );
});
