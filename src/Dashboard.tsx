import * as React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { useTranslate } from 'react-admin';

const Dashboard = () => {
    const translate = useTranslate();
    return (
        <Card>
            <CardHeader title={translate('pos.dashboard.welcome.title')} />
            <CardContent>{translate('pos.dashboard.welcome.content')}</CardContent>
        </Card>
    );
};

export default Dashboard;
