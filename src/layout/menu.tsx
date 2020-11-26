import React from 'react';
import { FC } from 'react';
import { Box } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink, MenuProps, useTranslate } from 'react-admin';
import users from '../users';
import clusters from '../cluster';
import applications from '../application';

const Menu: FC<MenuProps> = ({ onMenuClick, dense = false }: MenuProps) => {
    const translate = useTranslate();
    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={true} />
            <MenuItemLink
                to={`/users`}
                primaryText={translate('resources.users.name', { smart_count: 2 })}
                leftIcon={<users.icon />}
                onClick={onMenuClick}
                dense={dense}
                sidebarIsOpen={false}
            />
            <MenuItemLink
                to={`/cluster`}
                primaryText={translate('resources.cluster.name', { smart_count: 2 })}
                leftIcon={<clusters.icon />}
                onClick={onMenuClick}
                dense={dense}
                sidebarIsOpen={false}
            />
            <MenuItemLink
                to={`/application`}
                primaryText={translate('resources.application.name', { smart_count: 2 })}
                leftIcon={<applications.icon />}
                onClick={onMenuClick}
                dense={dense}
                sidebarIsOpen={false}
            />
        </Box>
    );
};

export default Menu;
