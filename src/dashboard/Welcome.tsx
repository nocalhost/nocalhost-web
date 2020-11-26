import * as React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { useTranslate } from 'react-admin';

const Welcome = () => {
    const translate = useTranslate();
    return (
        <Card>
            <CardHeader title={translate('nh.dashboard.welcome.title')} />
            <CardContent>{translate('nh.dashboard.welcome.content')}</CardContent>
        </Card>
    );
};

export default Welcome;
