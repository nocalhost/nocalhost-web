import React, { useState } from 'react';
import { useDataProvider, Button } from 'react-admin';
// import { Button } from '@material-ui/core';
import ContentDialog from './ContentDialog';
import { makeStyles } from '@material-ui/core/styles';

interface KubeConfigDialogProps {
    open: boolean;
    onClose: () => void;
    kubeconfig: string;
}
const useStyles = makeStyles(() => ({ kube: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }));

const KubeConfigDialog = (props: KubeConfigDialogProps) => {
    const classes = useStyles();
    return (
        <ContentDialog title={'KubeConfig'} open={props.open} onClose={props.onClose}>
            <pre className={classes.kube}>{props.kubeconfig}</pre>
        </ContentDialog>
    );
};

const KubeConfigButton = ({ record, resource }: any) => {
    const [open, setOpen] = useState(false);

    const [kubeconfig, setKubeconfig] = useState('');
    const dataProvider = useDataProvider();

    const fetchKubeconfig = async () => {
        let getResource = resource;
        if (resource === 'dev_space') {
            getResource = 'space';
        }
        const { data } = await dataProvider.getOne(getResource, { id: record.id });
        if (data && data.kubeconfig) {
            setKubeconfig(data.kubeconfig);
        }
    };

    const handleClickOpen = () => {
        if (!kubeconfig || kubeconfig.length <= 0) {
            fetchKubeconfig();
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <KubeConfigDialog onClose={handleClose} open={open} kubeconfig={kubeconfig} />
            <Button onClick={handleClickOpen} label="KubeConfig" />
        </>
    );
};

export default KubeConfigButton;
