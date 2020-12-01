import React from 'react';
import { useTranslate } from 'react-admin';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        card: { marginTop: '20px', padding: '16px' },
        type: { padding: '16px', border: '1px solid #d0d0d0', marginTop: '20px' },
        setp: {
            marginTop: '10px',
            marginBottom: '10px',
            padding: '16px',
            border: '1px solid #d0d0d0',
            '& > a': { textDecoration: 'none', fontSize: '14px' },
        },
        command: {
            background: '#f5f2f0',
            marginBottom: '0',
            padding: '10px',
        },
    })
);

export default function Document() {
    const classes = useStyles();
    const translate = useTranslate();
    // eslint-disable-next-line
    // @ts-ignore
    const apiUrl = window._env_.API_HOST || window.location.origin;

    return (
        <div>
            <Card className={classes.card}>
                <Typography variant="h5" component="h5">
                    {translate('resources.space.document.vscode')}
                </Typography>
                <div className={classes.type}>
                    <div className={classes.setp}>
                        {translate('resources.space.document.vscode_step1')} <br />
                        <Link
                            href={`${translate('resources.space.document.vscode_step1_1')}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {translate('resources.space.document.vscode_step1_1')}
                        </Link>
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.vscode_step2')} <br />
                        {translate('resources.space.document.vscode_step2_1', {
                            apiUrl: apiUrl,
                        })}
                        <br />
                        {translate('resources.space.document.vscode_step2_2')}
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.vscode_step3')} <br />
                        {translate('resources.space.document.vscode_step3_1')} <br />
                        {translate('resources.space.document.vscode_step3_2')} <br />
                        {translate('resources.space.document.vscode_step3_3')}
                    </div>
                </div>
            </Card>
            <Card className={classes.card}>
                <Typography variant="h5" component="h5">
                    {translate('resources.space.document.nhctl')}
                </Typography>
                <div className={classes.type}>
                    <div className={classes.setp}>
                        {translate('resources.space.document.nhctl_step1')}
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.nhctl_step2')}
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.nhctl_step3')} <br />
                        <Link href="#" target="_blank" rel="noreferrer">
                            {translate('resources.space.document.nhctl_step3_1')} <br />
                        </Link>
                        <pre className={classes.command}>
                            {translate('resources.space.document.nhctl_step3_2')}
                        </pre>
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.nhctl_step4')} <br />
                        <Link href="#" target="_blank" rel="noreferrer">
                            {translate('resources.space.document.nhctl_step4_1')} <br />
                        </Link>
                        <pre className={classes.command}>
                            {translate('resources.space.document.nhctl_step4_2')}
                        </pre>
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.nhctl_step5')} <br />
                        <Link href="#" target="_blank" rel="noreferrer">
                            {translate('resources.space.document.nhctl_step5_1')} <br />
                        </Link>
                        <pre className={classes.command}>
                            {translate('resources.space.document.nhctl_step5_2')}
                        </pre>
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.nhctl_step6')} <br />
                        <Link href="#" target="_blank" rel="noreferrer">
                            {translate('resources.space.document.nhctl_step6_1')} <br />
                        </Link>
                        <pre className={classes.command}>
                            {translate('resources.space.document.nhctl_step6_2')}
                        </pre>
                    </div>
                    <div className={classes.setp}>
                        {translate('resources.space.document.nhctl_step7')} <br />
                        <Link href="#" target="_blank" rel="noreferrer">
                            {translate('resources.space.document.nhctl_step7_1')} <br />
                        </Link>
                        <pre className={classes.command}>
                            {translate('resources.space.document.nhctl_step7_2')} <br />
                            {translate('resources.space.document.nhctl_step7_3')}
                        </pre>
                    </div>
                </div>
            </Card>
        </div>
    );
}
