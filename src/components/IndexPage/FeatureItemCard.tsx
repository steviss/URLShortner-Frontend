import { Grid, Card, CardContent, Box, Typography, CardActions, Button, Grow } from '@material-ui/core';
import { indexPageStyle } from '@styles';
import React, { ReactElement } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useHistory } from 'react-router-dom';

export interface FeatureItemCardProps {
    icon: ReactElement;
    headline: string;
    body: string;
}

export const FeatureItemCard: React.FC<FeatureItemCardProps> = ({ icon, headline, body }) => {
    const indexPageCSS = indexPageStyle();
    const history = useHistory();
    return (
        <Grow in={true}>
            <Grid item xs={12} md={4} className={indexPageCSS.featureItemContainer}>
                <Card className={indexPageCSS.featureItem}>
                    <CardContent className={indexPageCSS.featureItemContent}>
                        <Box className={indexPageCSS.featureItemIcon}>{icon}</Box>
                        <Typography variant="h3" className={indexPageCSS.featureItemHeading}>
                            {headline}
                        </Typography>
                        <Typography variant="body2" component="p" align="center">
                            {body}
                        </Typography>
                    </CardContent>
                    <CardActions className={indexPageCSS.featureItemActions}>
                        <Button size="small" startIcon={<PersonAddIcon />} onClick={() => history.push('/register')}>
                            Register
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grow>
    );
};
