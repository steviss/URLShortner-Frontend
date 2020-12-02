import React from 'react';
import { observer } from 'mobx-react';
import { Box, Grid, Paper } from '@material-ui/core';

export const TermsPage: React.FC = observer(() => {
    return (
        <Grid>
            <Paper>
                <Box>Terms Page</Box>
            </Paper>
        </Grid>
    );
});
