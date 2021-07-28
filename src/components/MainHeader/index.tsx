import React, { useContext } from 'react';
import { Logo, MainContent, LogoName, Flex } from './style-components';
import Icon from '../../images/logo.png';
import { UserContext } from '../../provider/appContext';
import { useTranslation } from 'react-i18next';
function MainHeader() {
    const { user } = useContext(UserContext);
    console.log(user);
    const { i18n } = useTranslation();
    return (
        <MainContent>
            <Flex onClick={() => i18n.changeLanguage(i18n.language == 'en' ? 'zh' : 'en')}>
                <Logo src={Icon}></Logo>
                <LogoName>Nocalhost管理中心</LogoName>
            </Flex>
        </MainContent>
    );
}

export default MainHeader;
