import React, { FC } from 'react';
import { Show, SimpleShowLayout, TextField, ShowProps, useTranslate } from 'react-admin';
import { Base64 } from 'js-base64';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Document from './Document';
import ResourceLimitButton from '../components/ResourceLimitButton';

const useStyles = makeStyles(() => ({
    spaceInfo: { display: 'flex', justifyContent: 'space-between' },
}));

const StatusField = (record: any) => {
    const translate = useTranslate();
    return (
        <div>
            {record.status === 1
                ? translate('resources.myDevSpace.status.deployed')
                : translate('resources.myDevSpace.status.undeployed')}
        </div>
    );
};
StatusField.defaultProps = { source: 'Status', addLabel: true };

const DownloadButton = (props: any) => {
    const translate = useTranslate();
    return (
        <Button
            color="primary"
            href={`data:application/octet-stream;charset=utf-16le;base64,${Base64.encode(
                props.record.kubeconfig,
                false
            )}`}
            download="config"
        >
            {translate('resources.myDevSpace.actions.download')}
        </Button>
    );
};
DownloadButton.defaultProps = { addLabel: false };

const SpaceShow: FC<ShowProps> = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    return (
        <>
            <Show {...props} title={translate('resources.myDevSpace.name')}>
                <SimpleShowLayout className={classes.spaceInfo}>
                    <TextField label="resources.myDevSpace.fields.space_name" source="space_name" />
                    <TextField
                        source="application_name"
                        label="resources.myDevSpace.fields.application"
                    />
                    <TextField source="cluster_name" label="resources.myDevSpace.fields.cluster" />
                    <TextField source="namespace" label="resources.myDevSpace.fields.namespace" />
                    <TextField source="user_name" label="resources.myDevSpace.fields.user" />
                    <ResourceLimitButton />
                    <DownloadButton />
                </SimpleShowLayout>
            </Show>
            <Document {...props} />
        </>
    );
};

export default SpaceShow;
