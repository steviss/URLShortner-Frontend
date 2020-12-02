import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { ShortenForm } from '@components';

export const IndexPage: React.FC = observer(() => {
    return (
        <Grid>
            <ShortenForm />
        </Grid>
    );
});
