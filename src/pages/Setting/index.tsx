import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingWrap } from './styled-component';
import ThirdAccount from './components/ThirdAccount';
import ConfigService from './components/ConfigService';
import { Modal } from 'antd';
import HTTP from '../../api/fetch';
import { ConfigInfo } from '../../types';

const CONFIG_MENU_LIST = ['thirdAccount'];

const Settings = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [status, setStatus] = useState<'unallocated' | 'configured'>('unallocated');
    const [configData, setConfigData] = useState<ConfigInfo | null>(null);

    const showConfig = () => {
        setShowModal(true);
    };

    const getConfig = async () => {
        const response = await HTTP.get('/ldap/config');
        if (response.code === 0) {
            const { data } = response;
            if (data) {
                setStatus('configured');
                setConfigData(data);
            }
        }
    };

    useEffect(() => {
        getConfig();
    }, []);

    return (
        <>
            <SettingWrap>
                <div className="menu">
                    <div className="title">{t('settings.settingCenter')}</div>
                    <ul className="menu-list">
                        {CONFIG_MENU_LIST.map((item, index) => {
                            return (
                                <li
                                    onClick={() => setCurrentIndex(index)}
                                    key={index}
                                    className={`menu-list-item${
                                        currentIndex === index ? ' active' : ''
                                    }`}
                                >
                                    {t(`settings.${item}`)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="content">
                    <div className="title">{t(`settings.${CONFIG_MENU_LIST[currentIndex]}`)}</div>
                    <ThirdAccount showConfig={showConfig} status={status} />
                </div>
            </SettingWrap>
            <Modal
                title={t('settings.configLdap')}
                width={680}
                visible={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
            >
                <ConfigService configData={configData} onClose={() => setShowModal(false)} />
            </Modal>
        </>
    );
};

export default Settings;
