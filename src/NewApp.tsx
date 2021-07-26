import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home.tsx';
const theme1 = {
    mainBgColor: '#f0f4f8',
};
function App() {
    return (
        <ThemeProvider theme={theme1}>
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Redirect to="/" />
                {/* <Route  component={NoMatch} /> */}
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
