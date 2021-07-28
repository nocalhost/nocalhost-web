import React, { useReducer } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home.tsx';
import Login from './pages/Login';
import { UserContext, reducer, initState } from './provider/appContext';
const theme1 = {
    mainBgColor: '#f0f4f8',
};
function App() {
    const Provider = UserContext.Provider;
    const [user, dispatch] = useReducer(reducer, initState);
    return (
        <ThemeProvider theme={theme1}>
            <Provider value={{ user, dispatch }}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route path="/dashboard" component={Home} />
                        <Route path="*" render={() => <Redirect to={{ pathname: '/login' }} />} />
                    </Switch>
                    {/* <Route  component={NoMatch} /> */}
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
