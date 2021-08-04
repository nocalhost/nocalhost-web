import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ListItem, MainContent, Bottom } from './style-components';
// import { UserContext } from '../../provider/appContext';
import { useTranslation } from 'react-i18next';
function Dashbord() {
    // const history = useHistory();
    const urlParams = useLocation();
    const pathName = urlParams.pathname;
    // const { user } = useContext(UserContext);
    const [expand, setExpand] = useState(true);
    const { t } = useTranslation();

    const DASHBOARD = [
        {
            icon: '',
            name: t('resources.dashboard.name'),
            url: '/dashboard/overview',
        },
        {
            icon: '',
            name: t('resources.users.name'),
            url: '/dashboard/user',
        },
        {
            icon: '',
            name: t('resources.application.name'),
            url: '/dashboard/application',
        },
    ];
    return (
        <MainContent expand={expand}>
            {DASHBOARD.map((item) => {
                return (
                    <ListItem key={item.name} isActive={pathName.startsWith(item.url)}>
                        <Link to={item.url}>{item.name}</Link>
                    </ListItem>
                );
            })}
            {/* <div onClick={toAppliction}>application</div>
            <div onClick={toUser}>user</div> */}
            <Bottom expand={expand} onClick={() => setExpand(!expand)}>
                展开
            </Bottom>
        </MainContent>
    );
}

export default Dashbord;
