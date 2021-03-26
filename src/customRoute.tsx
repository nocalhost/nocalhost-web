import React from 'react';
import { Route } from 'react-router-dom';
import Profile from './profile';
import Auth from './auth';

export default [
    <Route exact path="/profile" component={Profile} key="profile" />,
    <Route exact path="/application/:id/auth" component={Auth} key="auth" />,
];
