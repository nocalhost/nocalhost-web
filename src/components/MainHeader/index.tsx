import React from 'react';
import { Logo, MainContent, LogoName, Flex } from './style-components';
import Icon from '../../images/logo.png';

function MainHeader() {
    return (
        <MainContent>
            <Flex>
                <Logo src={Icon}></Logo>
                <LogoName>Nocalhost管理中心</LogoName>
            </Flex>
        </MainContent>
    );
}

export default MainHeader;
