import React from 'react';
import { Layout, LayoutProps, Sidebar } from 'react-admin';
import AppBar from './appbar';
import Menu from './menu';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

const NHLayout = (props: LayoutProps) => (
    <Layout {...props} appBar={AppBar} sidebar={CustomSidebar} menu={Menu} />
);

export default NHLayout;
