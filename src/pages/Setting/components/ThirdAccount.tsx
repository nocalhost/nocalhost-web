import React, { useState } from 'react';
import { ThirdAccountWrap, PopupWrap } from '../styled-component';
import { Button, Popover } from 'antd';
import { useTranslation } from 'react-i18next';

import { ReactComponent as IconLdap } from '../../../images/icon/icon_ldap.svg';
import { ReactComponent as IconArrowDown } from '../../../images/icon/icon_arrow_down.svg';
import { ReactComponent as IconExplain } from '../../../images/icon/icon_label_explain.svg';
import Icon from '@ant-design/icons';
import DeleteModal from '../../../components/DeleteModal';
import CommonIcon from '../../../components/CommonIcon';

interface ThirdAccountProp {
    status: 'unallocated' | 'configured';
    showConfig: () => void;
    handleSyncData: () => any;
    handleDeleteConfig: () => void;
    configData: any;
}

const ThirdAccount = ({
    status,
    showConfig,
    handleSyncData,
    handleDeleteConfig,
    configData,
}: ThirdAccountProp) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [showSyncTip, setShowSyncTip] = useState<boolean>(Boolean(configData?.last_sync_err_msg));
    const [syncTip, setSyncTip] = useState<string>(configData?.last_sync_err_msg ?? '');

    const handleEditConfig = () => {
        setVisible(false);
        showConfig();
    };

    const handleDelete = () => {
        setVisible(false);
        handleDeleteConfig();
    };

    const handleClick = async () => {
        setIsLoading(true);
        const resp = await handleSyncData();
        if (resp?.data?.last_sync_err_msg) {
            setSyncTip(resp?.data?.last_sync_err_msg ?? '');
            setShowSyncTip(true);
        }

        setIsLoading(false);
    };

    const onClickDelete = () => {
        setVisible(false);
        setShowDelete(true);
    };

    const PopupContent = () => {
        return (
            <PopupWrap>
                <li className="list-item modify" onClick={handleEditConfig}>
                    {t('settings.modifyConfig')}
                </li>
                <li className="list-item del" onClick={onClickDelete}>
                    {t('settings.deleteConfig')}
                </li>
            </PopupWrap>
        );
    };

    return (
        <ThirdAccountWrap status={status}>
            <div className="left">
                <div className="logo">
                    <Icon component={IconLdap} style={{ fontSize: 40 }} />
                </div>
                <div className="content">
                    <div className="sub-title">
                        <span>LDAP</span>
                        <div className="status">{t(`settings.${status}`)}</div>
                    </div>
                    <div className="desc">
                        <span>{t('settings.thirdAccountDesc')}</span>
                        <a href="">{t('settings.helpDocs')}</a>
                    </div>
                </div>
            </div>
            <div className="btn-box">
                {showSyncTip && (
                    <CommonIcon
                        title={syncTip}
                        NormalIcon={IconExplain}
                        style={{ fontSize: 20, marginRight: 14 }}
                    />
                )}
                {status === 'unallocated' && (
                    <Button type="primary" onClick={showConfig}>
                        {t('settings.configService')}
                    </Button>
                )}
                {status === 'configured' && (
                    <>
                        <Button type="primary" onClick={handleClick} loading={isLoading}>
                            {t('settings.syncData')}
                        </Button>
                        <Popover
                            content={<PopupContent />}
                            visible={visible}
                            onVisibleChange={(curr: boolean) => setVisible(curr)}
                            trigger="click"
                        >
                            <Button style={{ marginLeft: 12 }}>
                                <div className="popup-btn">
                                    {t('settings.editConfig')}
                                    <IconArrowDown />
                                </div>
                            </Button>
                        </Popover>
                    </>
                )}
            </div>
            <DeleteModal
                visible={showDelete}
                title={t('settings.deleteConfig')}
                message={t('settings.deleteConfirm')}
                onCancel={() => setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </ThirdAccountWrap>
    );
};

export default ThirdAccount;
