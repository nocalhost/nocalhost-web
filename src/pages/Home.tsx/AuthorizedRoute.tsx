import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../provider/appContext';
function AuthorizedRoute(props: any) {
    const { user } = useContext(UserContext);
    const { adminPage } = props;
    const is_admin = user.is_admin;
    if (!localStorage.getItem('token')) {
        return <Route render={() => <Redirect to={{ pathname: '/login' }} />} />;
    }
    if (adminPage && is_admin !== 1) {
        // debugger;
        return <Route render={() => <Redirect to={{ pathname: '403' }} />} />;
    } else {
        return <Route {...props} />;
    }
}

export default AuthorizedRoute;
