import React from 'react';
import styled from 'styled-components';

const MainContent = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
    width: 100%;
    height: 60px;
`;

function MainHeader() {
    return <MainContent>我是头部</MainContent>;
}

export default MainHeader;
