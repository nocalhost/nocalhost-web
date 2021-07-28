import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DASHBOARD } from './consts';
import { ListItem, MainContent } from './style-components';
import { UserContext } from '../../provider/appContext';
function Dashbord() {
    // const history = useHistory();
    const urlParams = useLocation();
    const pathName = urlParams.pathname;
    const { user } = useContext(UserContext);
    let FILTER_DASHBOARD: any[] = [];
    if (user.is_admin === 0) {
        FILTER_DASHBOARD = DASHBOARD.filter((item) => item.url !== '/dashboard/user');
    } else {
        FILTER_DASHBOARD = DASHBOARD;
    }
    return (
        <MainContent>
            {FILTER_DASHBOARD.map((item) => {
                return (
                    <ListItem key={item.name} isActive={pathName.startsWith(item.url)}>
                        <Link to={item.url}>{item.name}</Link>
                    </ListItem>
                );
            })}
            {/* <div onClick={toAppliction}>application</div>
            <div onClick={toUser}>user</div> */}
        </MainContent>
    );
}

export default Dashbord;
