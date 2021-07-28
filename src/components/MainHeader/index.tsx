import React, { useContext } from 'react';
import { Logo, MainContent, LogoName, Flex } from './style-components';
import Icon from '../../images/logo.png';
import { UserContext } from '../../provider/appContext';
function MainHeader() {
    const { user } = useContext(UserContext);
    console.log(user);
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
