import React, { Fragment, useState } from 'react';
import { FC } from 'react';
import { LockOpen, Lock, PersonAdd } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    ShowButton,
    ListProps,
    useTranslate,
    useDataProvider,
    useRefresh,
    usePermissions,
    Confirm,
} from 'react-admin';
import { useHistory } from 'react-router-dom';
import DateField from '../components/DateField';

const SourceField = ({ record }: any) => <div>{getSourceType(record.context.source)}</div>;

function getSourceType(source: string) {
    let type = '';
    switch (source) {
        case 'git':
            type = 'Git';
            break;
        case 'local':
            type = 'Local';
            break;
        default:
            type = 'Helm';
    }

    return type;
}

const useStyles = makeStyles({
    bt: {
        color: '#6f38ff',
    },
});

const ApplicationList: FC<ListProps> = (props) => {
    const { permissions } = usePermissions();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();
    async function authApp(appId: string, ispublic: boolean) {
        await dataProvider.authApp(appId, ispublic);
        refresh();
    }
    return (
        <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
            <Datagrid>
                <TextField
                    label="resources.application.fields.application_name"
                    source="context.application_name"
                    sortable={false}
                />
                <SourceField
                    label="resources.application.fields.source"
                    source="context.source"
                    sortable={false}
                />
                {permissions === 'admin' && (
                    <ReferenceField
                        label="resources.application.fields.user"
                        source="user_id"
                        reference="users"
                        sortable={false}
                    >
                        <TextField source="name" />
                    </ReferenceField>
                )}
                <DateField sortable={false} source="created_at" />
                <ShowButton />
                <MyEditButton />
                <PermissionAdd permissions={permissions} />
                <IsPublicButton permissions={permissions} authApp={authApp} />
            </Datagrid>
        </List>
    );
};

const MyEditButton = (props: any) => {
    return <EditButton {...props} disabled={!props.record.editable} />;
};

const IsPublicButton = ({ record, authApp, permissions }: any) => {
    const translate = useTranslate();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleConfirm = () => {
        authApp(record.id, record.public ? false : true);
        setOpen(false);
    };
    return (
        <Fragment>
            <Button
                onClick={() => setOpen(true)}
                disabled={!record.editable || permissions !== 'admin'}
                className={classes.bt}
                startIcon={record.public ? <LockOpen /> : <Lock />}
            >
                {record.public
                    ? translate('resources.application.auth.bt.public')
                    : translate('resources.application.auth.bt.private')}
            </Button>
            <Confirm
                isOpen={open}
                title={translate('resources.application.permission.confirm.title', {
                    name: record && record.context.application_name,
                })}
                content={translate('resources.application.permission.confirm.content')}
                onConfirm={handleConfirm}
                onClose={() => setOpen(false)}
            ></Confirm>
        </Fragment>
    );
};

const PermissionAdd = (props: any) => {
    const translate = useTranslate();
    const classes = useStyles();
    const history = useHistory();
    return (
        <Button
            disabled={
                !!(props.record.public || !props.record.editable || props.permissions !== 'admin')
            }
            className={classes.bt}
            startIcon={<PersonAdd />}
            onClick={() => {
                history.push(`/application/${props.record.id}/auth`);
            }}
        >
            {translate('resources.application.auth.bt.auth')}
        </Button>
    );
};

// const SpaceCreateButton = ({ record }: any) => (
//     <Button
//         to={`space/create?application=${record.id}`}
//         label={'resources.space.actions.create'}
//         onClick={(e) => e.stopPropagation()}
//         component={Link}
//     />
// );

// const SpaceListButton = ({ record }: any) => {
//     return (
//         <Button
//             to={`space?application=${record.id}`}
//             label={'resources.space.actions.list'}
//             onClick={(e) => e.stopPropagation()}
//             component={Link}
//         />
//     );
// };

export default ApplicationList;
