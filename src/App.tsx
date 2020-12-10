import React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import users from './users';
import cluster from './cluster';
import application from './application';
import devSpace from './devSpace';
import space from './space';
import Dashboard from './dashboard';
import { englishMessages, chineseMessages } from './i18n';
import { auth, data } from './provider';
import { Login, Layout } from './layout';
import NhTheme from './theme';
import './App.css';

const messages = {
    zh: chineseMessages,
    en: englishMessages,
};
const i18nProvider = polyglotI18nProvider(
    // eslint-disable-next-line
    // @ts-ignore
    (locale) => (messages[locale] ? messages[locale] : messages.en),
    'en'
);

function App() {
    let apiUrl = '';
    // eslint-disable-next-line
    // @ts-ignore
    const apiHost = window._env_.API_HOST || window.location.origin;
    if (apiHost.indexOf('http') >= 0) {
        apiUrl = apiHost;
    } else {
        apiUrl = `http://${apiHost}`;
    }
    // eslint-disable-next-line
    // @ts-ignore
    const currentCommitId = window._env_.GIT_COMMIT_SHA;
    // eslint-disable-next-line
    console.log('Current Version: ', currentCommitId);

    const dataProvider = data(`${apiUrl}/v1`);
    const authProvider = auth(`${apiUrl}/v1`);
    return (
        <Admin
            title="Nocalhost"
            dashboard={Dashboard}
            layout={Layout}
            loginPage={Login}
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            theme={NhTheme}
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
