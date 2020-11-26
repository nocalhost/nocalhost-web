import React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import users from './users';
import cluster from './cluster';
import application from './application';
import devSpace from './devSpace';
import Dashboard from './Dashboard';
import englishMessages from './i18n/en';
import chineseMessages from './i18n/zh';
import space from './space';
import auth from './provider/authProvider';
import data from './provider/dataProvider';
import { Login, Layout } from './layout';
import './App.css';

const messages = {
    zh: chineseMessages,
    en: englishMessages,
};
const i18nProvider = polyglotI18nProvider((locale) => {
    // eslint-disable-next-line
    console.log(locale);
    // eslint-disable-next-line
    // @ts-ignore
    return messages[locale] ? messages[locale] : messages.en;
}, 'cn');

function App() {
    // eslint-disable-next-line
    // @ts-ignore
    const apiUrl = window._env_.API_HOST || window.location.origin;
    // eslint-disable-next-line
    // @ts-ignore
    const currentCommitId = window._env_.GIT_COMMIT_SHA;
    // eslint-disable-next-line
    console.log('Current Version: ', currentCommitId);

    const dataProvider = data(`${apiUrl}/v1`);
    const authProvider = auth(`${apiUrl}/v1`);
    return (
        <Admin
            dashboard={Dashboard}
            layout={Layout}
            loginPage={Login}
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
        >
            <Resource name="cluster" {...cluster} />
            <Resource name="application" {...application} />
            <Resource name="users" {...users} />
            <Resource name="space" {...space} />
            <Resource name="dev_space" {...devSpace} />
        </Admin>
    );
}

export default App;
