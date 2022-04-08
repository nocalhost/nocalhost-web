import React, { useEffect, useContext } from 'react';
import MainHeader from '../../components/MainHeader';
import Dashbord from '../../components/Dashbord';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import HTTP from '../../api/fetch';
import { UserContext, UPDATE_USER } from '../../provider/appContext';
import AuthorizedRoute from './AuthorizedRoute';

const Flex = styled.div`
    display: flex;
    height: 100%;
`;

const Main = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Content = styled.div`
    padding: 12px 24px 24px 0px;
    width: 100%;
    height: calc(100vh - 68px);
    overflow: auto;
`;

function Home() {
    const { user, dispatch } = useContext(UserContext);
    useEffect(() => {
        async function getUser() {
            if (localStorage.getItem('token') && !user.id) {
                const user = await HTTP.get('me');
                if (user.code === 0) {
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({ type: UPDATE_USER, user: user?.data });
                    localStorage.setItem('userId', user.data.id);
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
                        {routes.map((item: any) => {
                            return <AuthorizedRoute key={item.path} {...item}></AuthorizedRoute>;
                        })}
                        <Route
                            path="/dashboard/403"
                            exact
                            render={() => <div>没有权限</div>}
                        ></Route>
                    </Switch>
                </Content>
            </Flex>
        </Main>
    );
}

export default Home;
