import React, { useEffect, useContext } from 'react';
import MainHeader from '../../components/MainHeader';
import Dashbord from '../../components/Dashbord';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Application from '../Application';
import User from '../User';
import HTTP from '../../api/fetch';
import { UserContext, UPDATE_USER } from '../../provider/appContext';
const Flex = styled.div`
    display: flex;
`;

const Main = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Content = styled.div`
    padding: 12px 24px 24px 24px;
    width: 100%;
`;

// 有头 有sidebar
function Home() {
    const { user, dispatch } = useContext(UserContext);
    useEffect(() => {
        async function getUser() {
            if (localStorage.getItem('token') && !user.id) {
                const user = await HTTP.get('me');
                if (user.code === 0) {
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(UPDATE_USER, user?.data);
                    localStorage.setItem('userId', user.id);
                }
            }
        }
        getUser();
    }, []);
    return (
        <Main>
            <MainHeader></MainHeader>
            <Flex>
                <Dashbord></Dashbord>
                <Content>
                    <Switch>
                        <Route exact path="/application" component={Application} />
                        <Route exact path="/user" component={User} />
                        <Route exact path="/403" render={() => <div>123</div>} />
                    </Switch>
                </Content>
            </Flex>
        </Main>
    );
}

export default Home;
