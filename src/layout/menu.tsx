import React from 'react';
import { FC } from 'react';
import { Box } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink, MenuProps } from 'react-admin';
import users from '../users';
import clusters from '../cluster';
import applications from '../application';

const Menu: FC<MenuProps> = ({ onMenuClick, dense = false }: MenuProps) => {
    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={true} />
            <MenuItemLink
                to={`/users`}
                primaryText="User List"
                leftIcon={<users.icon />}
                onClick={onMenuClick}
                dense={dense}
                sidebarIsOpen={false}
            />
            <MenuItemLink
                to={`/cluster`}
                primaryText="Cluster List"
                leftIcon={<clusters.icon />}
                onClick={onMenuClick}
                dense={dense}
                sidebarIsOpen={false}
            />
            <MenuItemLink
                to={`/application`}
                primaryText="Application List"
                leftIcon={<applications.icon />}
                onClick={onMenuClick}
                dense={dense}
                sidebarIsOpen={false}
            />
        </Box>
    );
};

export default Menu;
