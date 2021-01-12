import React, { useState } from 'react';
import { Button, FieldProps, useTranslate } from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';

interface ResourceLimitDialogProps {
    open: boolean;
    onClose: () => void;
    resource: any;
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
});

const ResourceLimitDialog = (props: ResourceLimitDialogProps) => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
                {translate('resources.space.fields.resource_limit')}
            </DialogTitle>
            <DialogContent dividers>
                <form noValidate autoComplete="off">
                    <Box>
                        <p className={classes.space}>
                            {translate('resources.space.devspaceLimitTitle')}
                        </p>
                        <Box>
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.requestTotalMem')}
                                disabled
                                defaultValue={props.resource['space_req_mem'] || ''}
                            />
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.limitTotalMem')}
                                disabled
                                defaultValue={props.resource['space_limits_mem'] || ''}
                            />
                        </Box>
                        <Box>
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.requestTotalCPU')}
                                disabled
                                defaultValue={props.resource['space_req_cpu'] || ''}
                            />
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.limitTotalCPU')}
                                disabled
                                defaultValue={props.resource['space_limits_cpu'] || ''}
                            />
                        </Box>
                        <Box>
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.PVC_num')}
                                disabled
                                defaultValue={props.resource['space_pvc_count'] || ''}
                            />
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.storageCapacity')}
                                disabled
                                defaultValue={props.resource['space_storage_capacity'] || ''}
                            />
                        </Box>
                        <Box>
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.lbNum')}
                                disabled
                                defaultValue={props.resource['space_lb_count'] || ''}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <p className={classes.space}>
                            {translate('resources.space.containerDefaultTitle')}
                        </p>
                        <Box>
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.requestMem')}
                                disabled
                                defaultValue={props.resource['container_req_mem'] || ''}
                            />
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.requestCPU')}
                                disabled
                                defaultValue={props.resource['container_req_cpu'] || ''}
                            />
                        </Box>
                        <Box>
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.limitMem')}
                                disabled
                                defaultValue={props.resource['container_limits_mem'] || ''}
                            />
                            <TextField
                                className={classes.space}
                                variant="filled"
                                label={translate('resources.space.fields.limitCPU')}
                                disabled
                                defaultValue={props.resource['container_limits_cpu'] || ''}
                            />
                        </Box>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const ResourceLimitButton = (props: FieldProps) => {
    const [open, setOpen] = useState(false);
    const { record } = props;
    const resourceLimitStr = get(record, 'space_resource_limit' || '{}');
    let resourceLimit = {};
    if (typeof resourceLimitStr !== 'string') {
        resourceLimit = resourceLimitStr;
    } else {
        resourceLimit = JSON.parse(resourceLimitStr || '{}');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ResourceLimitDialog onClose={handleClose} open={open} resource={resourceLimit} />
            <Button onClick={handleClickOpen} label={'ra.action.show'} />
        </>
    );
};

ResourceLimitButton.defaultProps = {
    label: 'resources.space.fields.resource_limit',
    addLabel: true,
};

export default ResourceLimitButton;
