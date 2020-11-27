import * as React from 'react';
import { Button, Dialog, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

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

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

interface ContentDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: any;
    showClose?: boolean;
}

const ContentDialog = (props: ContentDialogProps) => {
    const translate = useTranslate();
    return (
        <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open}>
            {props.title && props.title.length > 0 && (
                <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
                    {props.title}
                </DialogTitle>
            )}
            <DialogContent dividers>{props.children}</DialogContent>
            {props.showClose && (
                <DialogActions>
                    <Button autoFocus onClick={props.onClose} color="primary">
                        {translate('ra.action.close')}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ContentDialog;
