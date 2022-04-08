import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tabs, Table, Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';

import Container, { ImportContext, ImportStateType } from '../../User/Import/util';
import BreadCard from '../../../components/BreadCard';
import Result from '../../User/Import/result';
import { ImportBox } from '../../User/Import';
import { ReactComponent as selectIcon } from './asset/file.svg';
import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import link from './asset/devspace.yaml';
import { Tailwind } from '../../../components/Tailwind/style-components';
import { SelectOwnerUser, SelectCooperator } from './user';
import { getAllUser, UserType } from '../../../services';

const Import = () => {
    const [user, setUser] = useState<Array<UserType>>([]);
    useEffect(() => {
        getAllUser().then(setUser);
    }, []);
    const dataSource = [
        {
            key: '1',
            ns: 'nh1bkdxh',
            cluster: 'cluster',
            baseSpace: 1,
            owner: 1,
            cooperator: 1,
        },
    ];

    const columns: ColumnsType<any> = [
        {
            title: '命名空间',
            dataIndex: 'ns',
            key: 'ns',
        },
        {
            title: '集群',
            dataIndex: 'cluster',
            key: 'cluster',
        },
        {
            title: '基础开发空间(Mesh)',
            dataIndex: 'baseSpace',
            key: 'baseSpace',
            render() {
                return <Switch defaultChecked disabled />;
            },
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            key: 'owner',
            render() {
                return <SelectOwnerUser user={user} />;
            },
        },
        {
            title: '共享用户',
            dataIndex: 'cooperator',
            key: 'cooperator',
            width: '31%',
            render() {
                return <SelectCooperator user={user} />;
            },
        },
        {
            title: '操作',
            render() {
                return <Button className="rounded-l">导入</Button>;
            },
        },
    ];

    return (
        <Tailwind className="ns bg">
            <div className="header">
                <b>待导入开发空间（4）</b>
                <Button type="primary" className="rounded-l">
                    导入当前所有
                </Button>
            </div>
            <Table pagination={false} dataSource={dataSource} columns={columns} />
        </Tailwind>
    );
};

const ImportDevSpace = () => {
    const { t } = useTranslation();

    const [state, setState] = useState<ImportStateType>({});

    return (
        <Container>
            <BreadCard
                data={{
                    menu: t('resources.space.name'),
                    subMenu: '导入开发空间',
                    route: '/dashboard/devspace',
                }}
            />
            <Tabs defaultActiveKey="0">
                <Tabs.TabPane tab="命名空间导入" key="0">
                    <Import />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Yaml文件导入" key="1">
                    <div className="import bg">
                        <div className="container">
                            <ImportContext.Provider
                                value={{
                                    config: {
                                        icon: {
                                            select: selectIcon,
                                            default: defaultIcon,
                                        },
                                        template: {
                                            name: '开发空间导入模版.yaml',
                                            link: link,
                                            accept: '.yaml',
                                            suffix: ['yaml'],
                                        },
                                        complete: {
                                            link: '/dashboard/devspace',
                                            text: '成功导入 28',
                                        },
                                    },

                                    state,
                                    setState: (state) => {
                                        setState((prevState) => {
                                            return { ...prevState, ...state };
                                        });
                                    },
                                }}
                            >
                                {(state.result && <Result />) || <ImportBox t={t} />}
                            </ImportContext.Provider>
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </Container>
    );
};

export default ImportDevSpace;
