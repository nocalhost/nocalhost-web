import React, { FC, Fragment } from 'react';
import {
    DeleteWithConfirmButtonProps,
    Button,
    useDeleteWithConfirmController,
    Confirm,
    useTranslate,
    fetchUtils,
    useNotify,
    useRefresh,
} from 'react-admin';
import RefreshIcon from '@material-ui/icons/Refresh';
import classnames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { Result } from '../types';

const SpaceResetButton: FC<DeleteWithConfirmButtonProps> = (
    props: DeleteWithConfirmButtonProps
) => {
    const {
        confirmTitle = 'resources.space.reset.confirm.title',
        icon = <RefreshIcon />,
        label = 'resources.space.fields.reset',
        record,
        ...rest
    } = props;
    const classes = useStyles(props);
    const { open, loading, handleDialogOpen, handleDialogClose } = useDeleteWithConfirmController({
        record,
    });
    const translate = useTranslate();
    const notify = useNotify();
    const refresh = useRefresh();
    const handleDelete = (event: any) => {
        const token = localStorage.getItem('token');
        const options = {
            user: { authenticated: true, token: `Bearer ${token}` },
        };
        let apiUrl = '';
        // eslint-disable-next-line
        // @ts-ignore
        const apiHost = window._env_.API_HOST || window.location.origin;
        if (apiHost.indexOf('http') >= 0) {
            apiUrl = apiHost;
        } else {
            apiUrl = `http://${apiHost}`;
        }
        // eslint-disable-next-line
        // @ts-ignore
        const url = `${apiUrl}/v1/dev_space/${record.id}/recreate`;
        fetchUtils.fetchJson(url, { method: 'POST', ...options }).then((result: Result) => {
            if (result.json.code === 0) {
                notify('resources.space.reset.successed', 'info');
            } else {
                notify(result.json.message, 'error');
            }
            handleDialogClose(event);
            refresh();
        });
    };
    return (
        <Fragment>
            <Button
                onClick={handleDialogOpen}
                label={label}
                className={classnames('ra-delete-button', classes.deleteButton)}
                key="button"
                {...rest}
            >
                {icon}
            </Button>
            <Confirm
                isOpen={open}
                loading={loading}
                title={confirmTitle}
                content={translate('resources.space.reset.confirm.content', {
                    name: record && record.space_name,
                })}
                onConfirm={handleDelete}
                onClose={handleDialogClose}
            />
        </Fragment>
    );
};

const useStyles = makeStyles(
    (theme) => ({
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }),
    { name: 'RaDeleteWithConfirmButton' }
);

export default SpaceResetButton;
