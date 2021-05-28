import React, { useState, useRef } from 'react';
import { useDataProvider, Button, useTranslate, Loading } from 'react-admin';
import ContentDialog from './ContentDialog';
import { makeStyles } from '@material-ui/core/styles';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Tooltip } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

interface KubeConfigDialogProps {
    open: boolean;
    onClose: () => void;
    kubeconfig: string;
}
const useStyles = makeStyles(() => ({
    kube: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' },
    btn: { display: 'flex', justifyContent: 'flex-end' },
    loading: { maxHeight: 400 },
}));

const KubeConfigDialog = (props: KubeConfigDialogProps) => {
    let timer: any = 0;
    const classes = useStyles();
    const translate = useTranslate();
    const [tips, setTips] = useState(translate('nh.action.copy'));
    const onCopy = () => {
        clearTimeout(timer);
        setTips(translate('nh.action.copied'));
        timer = setTimeout(() => setTips(translate('nh.action.copy')), 2000);
    };
    const buttonRef = useRef(null);
    return (
        <ContentDialog title={'KubeConfig'} open={props.open} onClose={props.onClose}>
            <>
                {!props.kubeconfig && <Loading className={classes.loading} />}
                {props.kubeconfig && <pre className={classes.kube}>{props.kubeconfig}</pre>}
                <CopyToClipboard text={props.kubeconfig} onCopy={onCopy}>
                    <Tooltip title={tips} arrow placement="top">
                        <div ref={buttonRef} className={classes.btn}>
                            <Button label="nh.action.copy" variant="contained">
                                <FileCopyIcon />
                            </Button>
                        </div>
                    </Tooltip>
                </CopyToClipboard>
            </>
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
            getResource = 'devspace';
        }
        if (resource === 'myDevSpace') {
            getResource = 'devspace';
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
