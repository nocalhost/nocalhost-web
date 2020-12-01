import React from 'react';
import { useTranslate } from 'react-admin';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        card: { marginTop: '20px', padding: '16px' },
        setp: {
            marginTop: '10px',
            marginBottom: '10px',
            padding: '16px',
        },
    })
);

export default function Document() {
    const classes = useStyles();
    const translate = useTranslate();

    return (
        <div>
            <Card className={classes.card}>
                <Typography variant="h5" component="h5">
                    {translate('resources.space.document.vscode')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.vscode_step1')} <br />
                    {translate('resources.space.document.vscode_step1_1')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.vscode_step2')} <br />
                    {translate('resources.space.document.vscode_step2_1')} <br />
                    {translate('resources.space.document.vscode_step2_2')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.vscode_step3')} <br />
                    {translate('resources.space.document.vscode_step3_1')} <br />
                    {translate('resources.space.document.vscode_step3_2')} <br />
                    {translate('resources.space.document.vscode_step3_2')} <br />
                    {translate('resources.space.document.vscode_step3_3')}
                </Typography>
            </Card>
            <Card className={classes.card}>
                <Typography variant="h5" component="h5">
                    {translate('resources.space.document.nhctl')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.nhctl_step1')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.nhctl_step2')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.nhctl_step3')} <br />
                    {translate('resources.space.document.nhctl_step3_1')} <br />
                    {translate('resources.space.document.nhctl_step3_2')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.nhctl_step4')} <br />
                    {translate('resources.space.document.nhctl_step4_1')} <br />
                    {translate('resources.space.document.nhctl_step4_2')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.nhctl_step5')} <br />
                    {translate('resources.space.document.nhctl_step5_1')} <br />
                    {translate('resources.space.document.nhctl_step5_2')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.nhctl_step6')} <br />
                    {translate('resources.space.document.nhctl_step6_1')} <br />
                    {translate('resources.space.document.nhctl_step6_2')}
                </Typography>
                <Typography className={classes.setp} variant="body1" gutterBottom>
                    {translate('resources.space.document.nhctl_step7')} <br />
                    {translate('resources.space.document.nhctl_step7_1')} <br />
                    {translate('resources.space.document.nhctl_step7_2')} <br />
                    <pre>{translate('resources.space.document.nhctl_step7_3')}</pre>
                </Typography>
            </Card>
        </div>
    );
}
