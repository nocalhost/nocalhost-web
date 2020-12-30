import React, { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ShowProps,
    ReferenceField,
    useTranslate,
} from 'react-admin';
import { Base64 } from 'js-base64';
import ResourceLimitField from '../components/ResourceLimitField';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Document from './Document';

const useStyles = makeStyles(() => ({
    spaceInfo: { display: 'flex', justifyContent: 'space-between' },
}));

const Title = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <span>
            {translate('resources.space.name', { smart_count: 1 })}{' '}
            {record ? `"${record.space_name}"` : ''}
        </span>
    );
};

const StatusField = (record: any) => {
    const translate = useTranslate();
    return (
        <div>
            {record.status === 1
                ? translate('resources.space.status.deployed')
                : translate('resources.space.status.undeployed')}
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
            {translate('resources.space.actions.download')}
        </Button>
    );
};
DownloadButton.defaultProps = { addLabel: false };

const SpaceShow: FC<ShowProps> = (props) => {
    const classes = useStyles();
    return (
        <>
            <Show {...props} title={<Title />}>
                <SimpleShowLayout className={classes.spaceInfo}>
                    <TextField label="resources.space.fields.space_name" source="space_name" />
                    <ReferenceField
                        label="resources.space.fields.application"
                        source="application_id"
                        reference="application"
                    >
                        <TextField source="context.application_name" />
                    </ReferenceField>
                    <ReferenceField
                        label="resources.space.fields.cluster"
                        source="cluster_id"
                        reference="cluster"
                    >
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="namespace" />
                    <ReferenceField
                        label="resources.space.fields.user"
                        source="user_id"
                        reference="users"
                    >
                        <TextField source="name" />
                    </ReferenceField>
                    <ResourceLimitField />
                    <StatusField label="resources.space.fields.status" source="status" />
                    <DownloadButton />
                </SimpleShowLayout>
            </Show>
            <Document {...props} />
        </>
    );
};

export default SpaceShow;
