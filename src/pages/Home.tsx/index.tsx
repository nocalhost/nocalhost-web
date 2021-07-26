import React from 'react';
import MainHeader from '../../components/MainHeader';
import Dashbord from '../../components/Dashbord';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Application from '../Application';

const Flex = styled.div`
    display: flex;
`;

const Main = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Content = styled.div`
    padding: 12px 24px 24px 24px;
`;

// 有头 有sidebar
function Home() {
    return (
        <Main>
            <MainHeader></MainHeader>
            <Flex>
                <Dashbord></Dashbord>
                <Content>
                    <Switch>
                        <Route exact path="/application" component={Application} />
                    </Switch>
                </Content>
            </Flex>
        </Main>
    );
}

export default Home;
