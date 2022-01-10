import React, { useCallback, useReducer } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home.tsx';
import Login from './pages/Login';
import NothingPage from './pages/NothingPage';
import { UserContext, reducer, initState } from './provider/appContext';
import './i18n/i18n';
import { useTranslation } from 'react-i18next';

const theme1 = {
    mainBgColor: '#f0f4f8',
};
function App() {
    const Provider = UserContext.Provider;
    const [user, dispatch] = useReducer(reducer, initState);
    const { t } = useTranslation();

    const getMessage = useCallback(
        (key: string) => {
            const message = t(`validate.messages.${key}`);

            return message;
        },
        [t]
    );

    return (
        <ConfigProvider
            form={{
                validateMessages: {
                    required: getMessage('required'),
                    number: { min: getMessage('number.min') },
                },
            }}
        >
            <ThemeProvider theme={theme1}>
                <Provider value={{ user, dispatch }}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route path="/dashboard" component={Home} />
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to={{ pathname: '/dashboard/overview' }} />}
                            />
                            <Route path="*" component={NothingPage} />
                        </Switch>
                        {/* <Route  component={NoMatch} /> */}
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </ConfigProvider>
    );
}

export default App;
