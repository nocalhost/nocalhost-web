import React from 'react';
import { ThirdAccountWrap } from '../styled-component';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { ReactComponent as IconLdap } from '../../../images/icon/icon_ldap.svg';
import Icon from '@ant-design/icons';

interface ThirdAccountProp {
    status: string;
    showConfig: () => void;
}

const ThirdAccount = ({ status, showConfig }: ThirdAccountProp) => {
    const { t } = useTranslation();
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
                <Button type="primary" onClick={showConfig}>
                    {t('settings.configService')}
                </Button>
            </div>
        </ThirdAccountWrap>
    );
};

export default ThirdAccount;
