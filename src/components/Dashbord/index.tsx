import React from 'react';
import styled from 'styled-components';

const MainContent = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
    width: 220px;
    height: calc(100vh - 60px);
`;

function Dashbord() {
    return <MainContent>sidebar</MainContent>;
}

export default Dashbord;
