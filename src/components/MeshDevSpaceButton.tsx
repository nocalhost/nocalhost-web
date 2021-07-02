import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
    Button,
    useTranslate,
    SimpleForm,
    FieldProps,
    useDataProvider,
    BooleanInput,
    TextInput,
    Toolbar,
    SaveButton,
    SelectInput,
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

interface MeshDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;
    resource: any;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            minWidth: '600px',
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        liItem: {
            listStyle: 'none',
            height: '48px',
        },
        hidden: {
            visibility: 'hidden',
            width: 0,
            height: 0,
            margin: 0,
            padding: 0,
        },
        flexBlock: {
            minWidth: '400px',
            display: 'flex',
        },
        mr1: {
            width: '340px',
            marginRight: '1rem',
        },
        inlineBlock: {
            width: '384px',
            display: 'inline-flex',
            marginRight: '1rem',
        },
    });

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const CustomToolbar = (props: any) => {
    const dataProvider = useDataProvider();
    const { onClose } = props;
    const handleSave = useCallback(async (values: any) => {
        try {
            await dataProvider.update('resourceMeshInfo', values);
            onClose();
        } catch (e) {
            throw Error(e);
        }
    }, []);
    return (
        <Toolbar {...props}>
            <SaveButton onSave={handleSave} />
        </Toolbar>
    );
};

const MeshDialog = withStyles(styles)((props: MeshDialogProps) => {
    const { open, onClose, classes, resource } = props;
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [header, setHeader] = useState<{ key: string; value: string; prefix: string } | null>(
        null
    );
    const [apps, setApps] = useState([]);

    const queryMeshInfo = async () => {
        const result = await dataProvider.getMeshAppInfo(resource.id);

        try {
            const header = result.data.header;
            const { key, value } = header;
            const tmp = key.split('-');
            setHeader({
                prefix: tmp[1] ? tmp[0] : '',
                key: tmp[1] ? tmp[1] : key,
                value,
            });
        } catch (e) {
            setHeader({
                prefix: '',
                key: '',
                value: '',
            });
        }

        setApps(result.data ? result.data.apps : []);
    };

    useEffect(() => {
        queryMeshInfo();
    }, []);
    return (
        <Dialog open={open} onClose={onClose}>
            <MuiDialogTitle className={classes.root}>
                <Typography variant="h6">
                    {translate('resources.space.fields.meshDevSpace')}
                </Typography>
                <IconButton className={classes.closeButton} aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            <DialogContent dividers>
                <SimpleForm
                    redirect={`/devspace`}
                    record={resource}
                    toolbar={<CustomToolbar onClose={onClose} />}
                >
                    <ul>
                        {apps.map((item: any, key) => {
                            return (
                                <li key={key}>
                                    <div>{item.name}</div>
                                    <ul>
                                        {item.workloads.map((workload: any, loadIndex: number) => {
                                            return (
                                                <li className={classes.liItem} key={loadIndex}>
                                                    <BooleanInput
                                                        label={workload.name}
                                                        defaultValue={
                                                            workload.status ? true : false
                                                        }
                                                        source={`mesh_dev_info.apps.${item.name}.${workload.name}.status`}
                                                    ></BooleanInput>
                                                    <TextInput
                                                        source={`mesh_dev_info.apps.${item.name}.${workload.name}.kind`}
                                                        defaultValue={workload.kind}
                                                        className={classes.hidden}
                                                    ></TextInput>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                    {header && (
                        <div>
                            <div className={classes.flexBlock}>
                                <SelectInput
                                    label="resources.space.fields.header_key_prefix"
                                    source="mesh_dev_info.header.prefix"
                                    choices={[
                                        { id: 'uberctx', name: 'jaeger' },
                                        { id: 'baggage', name: 'zipkin' },
                                        { id: '', name: 'no' },
                                    ]}
                                    defaultValue={header.prefix}
                                    className={classes.mr1}
                                />
                                <TextInput
                                    label="resources.space.fields.header_key"
                                    source="mesh_dev_info.header.key"
                                    defaultValue={header.key}
                                    className={classes.inlineBlock}
                                />
                            </div>
                            <TextInput
                                label="resources.space.fields.header_value"
                                source="mesh_dev_info.header.value"
                                className={classes.inlineBlock}
                                defaultValue={header.value}
                            />
                        </div>
                    )}
                </SimpleForm>
            </DialogContent>
        </Dialog>
    );
});

const MeshDevSpaceButton = (props: FieldProps) => {
    const { record } = props;
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const handleClick = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };
    return (
        <>
            {openDialog && <MeshDialog resource={record} open={openDialog} onClose={handleClose} />}
            <Button
                disabled={!(record && record.id > 0)}
                onClick={handleClick}
                label="ra.action.edit"
            ></Button>
        </>
    );
};

MeshDevSpaceButton.defaultProps = {
    label: 'resources.space.fields.meshDevSpace',
    addLabel: true,
};

export default MeshDevSpaceButton;
