import React from 'react';
import { FC, useState } from 'react';
import { Box } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink, MenuProps } from 'react-admin';
import { useSelector } from 'react-redux';
import users from '../users';
import clusters from '../cluster';
import applications from '../application';
import SubMenu from './submenu';
import { AppState } from '../types';

type MenuName = 'menuUsers' | 'menuCluster' | 'menuApplication';

type MenuState = { menuUsers: boolean; menuCluster: boolean; menuApplication: boolean };

const Menu: FC<MenuProps> = ({ onMenuClick, dense = false }: MenuProps) => {
    const menuState = { menuUsers: false, menuCluster: false, menuApplication: false };
    const [state, setState] = useState(menuState);
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);

    const handleToggle = (menu: MenuName) => {
        setState((state: MenuState) => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={true} />
            <SubMenu
                handleToggle={() => handleToggle('menuUsers')}
                isOpen={state.menuUsers}
                name="Users"
                icon={<users.icon />}
                dense={dense}
                sidebarIsOpen={open}
            >
                <MenuItemLink
                    to={`/users`}
                    primaryText="User List"
                    leftIcon={<users.icon />}
                    onClick={onMenuClick}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCluster')}
                isOpen={state.menuCluster}
                name="Cluster"
                icon={<clusters.icon />}
                dense={dense}
                sidebarIsOpen={open}
            >
                <MenuItemLink
                    to={`/cluster`}
                    primaryText="Cluster List"
                    leftIcon={<clusters.icon />}
                    onClick={onMenuClick}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuApplication')}
                isOpen={state.menuApplication}
                name="Application"
                icon={<applications.icon />}
                dense={dense}
                sidebarIsOpen={open}
            >
                <MenuItemLink
                    to={`/application`}
                    primaryText="Application List"
                    leftIcon={<applications.icon />}
                    onClick={onMenuClick}
                    dense={dense}
                />
            </SubMenu>
        </Box>
    );
};

export default Menu;
