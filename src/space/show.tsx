import React, { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ShowProps,
    ReferenceField,
    useTranslate,
    usePermissions,
} from 'react-admin';
import { Base64 } from 'js-base64';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ResourceLimitButton from '../components/ResourceLimitButton';

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
    const { permissions } = usePermissions();
    return (
        <>
            <Show {...props} title={<Title />}>
                <SimpleShowLayout className={classes.spaceInfo}>
                    <TextField label="resources.space.fields.space_name" source="space_name" />
                    {permissions === 'admin' && (
                        <ReferenceField
                            label="resources.space.fields.cluster"
                            source="cluster_id"
                            reference="cluster"
                        >
                            <TextField source="name" />
                        </ReferenceField>
                    )}
                    <TextField source="namespace" />
                    {permissions === 'admin' && (
                        <ReferenceField
                            label="resources.space.fields.user"
                            source="user_id"
                            reference="users"
                        >
                            <TextField source="name" />
                        </ReferenceField>
                    )}
                    <ResourceLimitButton />
                    <StatusField label="resources.space.fields.status" source="status" />
                    <DownloadButton />
                </SimpleShowLayout>
            </Show>
        </>
    );
};

export default SpaceShow;
