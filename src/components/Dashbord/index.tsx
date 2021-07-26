import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const MainContent = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
    width: 220px;
    height: calc(100vh - 60px);
`;

function Dashbord() {
    const history = useHistory();
    const toAppliction = () => {
        history.push('/application');
    };
    const toUser = () => {
        history.push('/user');
    };
    return (
        <MainContent>
            <div onClick={toAppliction}>application</div>
            <div onClick={toUser}>user</div>
        </MainContent>
    );
}

export default Dashbord;
