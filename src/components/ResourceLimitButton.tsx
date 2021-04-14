import React, { useState, useCallback } from 'react';
// import Alert from '@material-ui/lab/Alert';
import {
    Button,
    FieldProps,
    useTranslate,
    usePermissions,
    useDataProvider,
    SimpleForm,
    NumberInput,
    Toolbar,
    SaveButton,
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import {
    cpuLimitValidate,
    cpuReqValidate,
    memLimitValidate,
    memReqValidate,
} from '../space/validation';

const ResourceLimitTips = ({ title }: any) => {
    const translate = useTranslate();

    return (
        <Typography variant="subtitle1" gutterBottom>
            {translate(title)}
        </Typography>
    );
};

interface ResourceLimitDialogProps {
    open: boolean;
    onClose: () => void;
    resource: any;
    isAdmin: boolean;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const useStyles = makeStyles({
    space: {
        margin: '5px 5px',
    },
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

const ResourceLimitDialog = (props: ResourceLimitDialogProps) => {
    const translate = useTranslate();
    const classes = useStyles();

    const CustomToolbar = (props: any) => {
        const dataProvider = useDataProvider();
        const updateData = useCallback(async (obj) => {
            dataProvider
                .update('resourceLimit', obj)
                .then(() => location.reload())
                .catch(() => {
                    // TODO: SHOW ALERT
                    // <Alert></Alert>;
                });
        }, []);
        return (
            <Toolbar {...props} classes={useStyles()}>
                <SaveButton
                    onSave={(values: any) => {
                        updateData({ id: values.id, data: values, previousData: props.record });
                    }}
                />
            </Toolbar>
        );
    };
    return (
        <Dialog
            onClose={props.onClose}
            aria-labelledby="simple-dialog-title"
            open={props.open}
            maxWidth="md"
        >
            <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
                {translate('resources.space.fields.resource_limit')}
            </DialogTitle>
            <DialogContent dividers>
                <SimpleForm record={props.resource} toolbar={<CustomToolbar />}>
                    <ResourceLimitTips title="resources.space.devspaceLimitTitle" />
                    <NumberInput
                        label="resources.space.fields.requestTotalMem"
                        source="space_req_mem"
                        formClassName={classes.inlineBlock}
                    />
                    <NumberInput
                        label="resources.space.fields.limitTotalMem"
                        source="space_limits_mem"
                        formClassName={classes.inlineBlock}
                    />
                    <div />
                    <NumberInput
                        label="resources.space.fields.requestTotalCPU"
                        source="space_req_cpu"
                        formClassName={classes.inlineBlock}
                    />
                    <NumberInput
                        label="resources.space.fields.limitTotalCPU"
                        source="space_limits_cpu"
                        formClassName={classes.inlineBlock}
                    />
                    <div />
                    <NumberInput
                        label="resources.space.fields.PVC_num"
                        source="space_pvc_count"
                        formClassName={classes.inlineBlock}
                    />
                    <NumberInput
                        label="resources.space.fields.storageCapacity"
                        source="space_storage_capacity"
                        formClassName={classes.inlineBlock}
                    />
                    <NumberInput label="resources.space.fields.lbNum" source="space_lb_count" />
                    <ResourceLimitTips title="resources.space.containerDefaultTitle" />
                    <NumberInput
                        label="resources.space.fields.requestMem"
                        source="container_req_mem"
                        formClassName={classes.inlineBlock}
                        validate={memReqValidate}
                    />
                    <NumberInput
                        label="resources.space.fields.limitMem"
                        source="container_limits_mem"
                        formClassName={classes.inlineBlock}
                        validate={memLimitValidate}
                    />
                    <div />
                    <NumberInput
                        label="resources.space.fields.requestCPU"
                        source="container_req_cpu"
                        formClassName={classes.inlineBlock}
                        validate={cpuReqValidate}
                    />
                    <NumberInput
                        label="resources.space.fields.limitCPU"
                        source="container_limits_cpu"
                        formClassName={classes.inlineBlock}
                        validate={cpuLimitValidate}
                    />
                </SimpleForm>
            </DialogContent>
        </Dialog>
    );
};

const ResourceLimitButton = (props: FieldProps) => {
    const [open, setOpen] = useState(false);
    const { permissions } = usePermissions();
    const { record } = props;
    const resourceLimitStr = get(record, 'space_resource_limit' || '{}');
    let resourceLimit: any = {};
    if (typeof resourceLimitStr !== 'string') {
        resourceLimit = resourceLimitStr;
    } else {
        resourceLimit = JSON.parse(resourceLimitStr || '{}');
    }
    resourceLimit['id'] = get(record, 'id');
    const reg = /([0-9.]+)[MG]i/g;
    for (const key in resourceLimit) {
        if (Object.prototype.hasOwnProperty.call(resourceLimit, key)) {
            const value = `${resourceLimit[key]}`;
            resourceLimit[key] = value.replace(reg, '$1');
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ResourceLimitDialog
                onClose={handleClose}
                open={open}
                resource={resourceLimit}
                isAdmin={permissions === 'admin'}
            />
            <Button
                disabled={!!(record && record.cluster_admin)}
                onClick={handleClickOpen}
                label={permissions === 'admin' ? 'ra.action.edit' : 'ra.action.show'}
            />
        </>
    );
};

ResourceLimitButton.defaultProps = {
    label: 'resources.space.fields.resource_limit',
    addLabel: true,
};

export default ResourceLimitButton;
