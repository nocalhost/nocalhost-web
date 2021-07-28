import React, { useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
                    <Route exact path="/login" component={Login} />
                    <Route path="/" component={Home} />
                    {/* <Route  component={NoMatch} /> */}
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
