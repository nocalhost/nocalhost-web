import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingWrap } from './styled-component';
import ThirdAccount from './components/ThirdAccount';

const CONFIG_MENU_LIST = ['thirdAccount'];

const Settings = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    return (
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
                <ThirdAccount status="unallocated" />
            </div>
        </SettingWrap>
    );
};

export default Settings;
