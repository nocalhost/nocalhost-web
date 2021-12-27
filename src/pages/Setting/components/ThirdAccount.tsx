import React from 'react';
import { ThirdAccountWrap } from '../styled-component';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const ThirdAccount = ({ status }: { status: string }) => {
    const { t } = useTranslation();
    return (
        <ThirdAccountWrap>
            <div className="left">
                <div className="logo"></div>
                <div className="content">
                    <div className="title">
                        <span>LDAP</span>
                        <span className="status">{t(`settings.${status}`)}</span>
                    </div>
                    <div className="desc">
                        <span></span>
                        <a href=""></a>
                    </div>
                </div>
            </div>
            <div className="btn-box">
                <Button type="primary">{t('settings.configService')}</Button>
            </div>
        </ThirdAccountWrap>
    );
};

export default ThirdAccount;
