import React, { useEffect, useState } from 'react';
import { useTranslate, useDataProvider, ShowProps, Loading } from 'react-admin';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Link } from '@material-ui/core';
import { Application, ApplicationContext } from '../types';
import VSCodeImage1 from '../images/vscode-plugin-1.png';
import VSCodeImage2 from '../images/vscode-plugin-2.png';
import VSCodeImage3 from '../images/vscode-plugin-3.png';
import VSCodeImage4 from '../images/vscode-plugin-4.png';

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
        img: {
            maxWidth: '100%',
            height: 'auto',
        },
        command: {
            background: '#f5f2f0',
            marginBottom: '0',
            padding: '10px',
        },
    })
);

export default function Document(props: ShowProps) {
    const classes = useStyles();
    const translate = useTranslate();
    // eslint-disable-next-line
    // @ts-ignore
    const apiUrl = window._env_.API_HOST || window.location.origin;

    const dataProvider = useDataProvider();

    // const [space, setSpace] = useState<Space>({ id: 0, cluster_id: 0, application_id: 0 });
    const [app, setApp] = useState<ApplicationContext>({
        application_name: '',
        application_url: '',
        source: '',
        install_type: '',
        resource_dir: '',
    });

    const fetchApplication = async () => {
        const { data } = await dataProvider.getOne<Application>('application', {
            id: parseInt(props.id || '0'),
        });
        // eslint-disable-next-line
        // @ts-ignore
        setApp(data.context);
    };

    // const fetchSpace = async () => {
    //     const { data } = await dataProvider.getOne<Space>('devspace', {
    //         id: parseInt(props.id || '0'),
    //     });
    //     setSpace(data);
    // };

    useEffect(() => {
        fetchApplication();
    }, []);

    if (!app.application_name) {
        return <Loading />;
    } else {
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
                            <img className={classes.img} src={VSCodeImage1} />
                            {translate('resources.space.document.vscode_step2_2')}
                            <img className={classes.img} src={VSCodeImage2} />
                        </div>
                        <div className={classes.setp}>
                            {translate('resources.space.document.vscode_step3')} <br />
                            {translate('resources.space.document.vscode_step3_1')} <br />
                            <img className={classes.img} src={VSCodeImage3} />
                            {translate('resources.space.document.vscode_step3_2')}
                            <br />
                            {translate('resources.space.document.vscode_step3_3')}
                            <img className={classes.img} src={VSCodeImage4} />
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
                            <Link
                                href={translate('resources.space.document.nhctl_install_url')}
                                target="_blank"
                            >
                                {translate('resources.space.document.nhctl_install_url')}
                            </Link>
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
                                {translate('resources.space.document.nhctl_step3_2', {
                                    appName: app.application_name,
                                    gitUrl: app.application_url,
                                })}
                            </pre>
                        </div>
                        <div className={classes.setp}>
                            {translate('resources.space.document.nhctl_step4')} <br />
                            <Link href="#" target="_blank" rel="noreferrer">
                                {translate('resources.space.document.nhctl_step4_1')} <br />
                            </Link>
                            <pre className={classes.command}>
                                {translate('resources.space.document.nhctl_step4_2', {
                                    appName: app.application_name,
                                    gitUrl: app.application_url,
                                })}
                            </pre>
                        </div>
                        <div className={classes.setp}>
                            {translate('resources.space.document.nhctl_step5')} <br />
                            <Link href="#" target="_blank" rel="noreferrer">
                                {translate('resources.space.document.nhctl_step5_1')} <br />
                            </Link>
                            <pre className={classes.command}>
                                {translate('resources.space.document.nhctl_step5_2', {
                                    appName: app.application_name,
                                    gitUrl: app.application_url,
                                })}
                            </pre>
                        </div>
                        <div className={classes.setp}>
                            {translate('resources.space.document.nhctl_step6')} <br />
                            <Link href="#" target="_blank" rel="noreferrer">
                                {translate('resources.space.document.nhctl_step6_1')} <br />
                            </Link>
                            <pre className={classes.command}>
                                {translate('resources.space.document.nhctl_step6_2', {
                                    appName: app.application_name,
                                    gitUrl: app.application_url,
                                })}
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
}
