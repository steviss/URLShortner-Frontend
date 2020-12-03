import React from 'react';
import { observer } from 'mobx-react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { termsPageStyle } from '@styles';
import { PageHeader, PageWrapper } from '@layout';
import { config } from '@utility/config';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = observer(() => {
    const termsPageCSS = termsPageStyle();
    return (
        <>
            <PageHeader className={termsPageCSS.header}>
                <Box className={termsPageCSS.cover}>
                    <Container maxWidth="lg" className={termsPageCSS.coverContainer}>
                        <Grid className={termsPageCSS.grid} container>
                            <Typography variant="h1" align="center" className={termsPageCSS.heading}>
                                Terms of Service
                            </Typography>
                        </Grid>
                    </Container>
                </Box>
            </PageHeader>
            <PageWrapper>
                <Paper className={termsPageCSS.landingPaper} square>
                    <Typography variant="h1" className={termsPageCSS.textHeadingOne}>
                        Generic Terms of Service for {config.__APP_NAME__}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Please read these terms of service ("terms", "terms of service") carefully before using {config.__APP_NAME__} website (the "service") operated by {config.__APP_NAME__} ("us",
                        'we", "our").
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        Conditions of Use
                    </Typography>
                    <Typography variant="body1" component="p">
                        We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a
                        purchase, you accept the following conditions. This is why we urge you to read them carefully.{' '}
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        Privacy Policy{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Before you continue using our website we advise you to read our privacy policy{' '}
                        <Link key="privacy" to={'/privacy'}>
                            here.
                        </Link>{' '}
                        regarding our user data collection. It will help you better understand our practices.
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        Copyright{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Content published on this website (digital downloads, images, texts, graphics, logos) is the property of {config.__APP_NAME__} and/or its content creators and protected by
                        international copyright laws. The entire compilation of the content found on this website is the exclusive property of {config.__APP_NAME__}, with copyright authorship for this
                        compilation by {config.__APP_NAME__}.
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        Communications{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        The entire communication with us is electronic. Every time you send us an email or visit our website, you are going to be communicating with us. You hereby consent to receive
                        communications from us. If you subscribe to the news on our website, you are going to receive regular emails from us. We will continue to communicate with you by posting news
                        and notices on our website and by sending you emails. You also agree that all notices, disclosures, agreements and other communications we provide to you electronically meet
                        the legal requirements that such communications be in writing.
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        Applicable Law{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        By visiting this website, you agree that the laws of the [your location], without regard to principles of conflict laws, will govern these terms of service, or any dispute of
                        any sort that might come between {config.__APP_NAME__} and you, or its business partners and associates.
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        Disputes{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by state or federal court [your location] and you consent
                        to exclusive jurisdiction and venue of such courts.
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        Comments, Reviews, and Emails{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Visitors may post content as long as it is not obscene, illegal, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or injurious in any
                        other way to third parties. Content has to be free of software viruses, political campaign, and commercial solicitation. We reserve all rights (but not the obligation) to
                        remove and/or edit such content. When you post your content, you grant {config.__APP_NAME__} non-exclusive, royalty-free and irrevocable right to use, reproduce, publish,
                        modify such content throughout the world in any media.
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        License and Site Access{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from
                        us.
                    </Typography>
                    <Typography variant="h2" className={termsPageCSS.textHeadingOne}>
                        User Account{' '}
                    </Typography>
                    <Typography variant="body1" component="p">
                        If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are
                        responsible for all activities that occur under your account or password. We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole
                        discretion.
                    </Typography>
                </Paper>
            </PageWrapper>
        </>
    );
});
