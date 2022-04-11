import { Button, message, Switch, Table, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllUser, UserType } from '../../../services';
import { ColumnsType } from 'antd/lib/table/interface';
import { SelectCooperator, SelectOwnerUser } from './user';
import { ReactComponent as IconFail } from '../../User/Import/asset/fail.svg';
import { Tailwind } from '../../../components/Tailwind/style-components';
import NotData from '../../../components/NotData';
import HTTP from '../../../api/fetch';

const BaseSpace = (...arg: [NsType['baseSpace'], NsType, number]) => {
    const [value, { state }] = arg;

    const disabled = state === 'import' || value !== 1;

    const node = <Switch defaultChecked={value === 1} disabled={disabled} />;

    if (value === 1) {
        return node;
    }

    return <Tooltip title={value === 0 ? '已是基础开发空间' : '未安装istio'}>{node}</Tooltip>;
};

interface NsType {
    key: string;
    ns: string;
    cluster: string;
    baseSpace: number;
    owner: number;
    cooperator: Array<number>;
    state: 'import' | 'error' | 'default';
    error?: string;
}

const NSImport = () => {
    const [user, setUser] = useState(Array.of<UserType>());
    const [data, setData] = useState(Array.of<NsType>());

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUser().then(setUser);

        setTimeout(async () => {
            const res = await HTTP.get<{ id: number }>('me');

            const owner = res.data?.id ?? -1;

            setData([
                {
                    key: '1',
                    ns: 'nh1bkdxh',
                    cluster: 'cluster',
                    baseSpace: 1,
                    owner,
                    cooperator: [],
                    state: 'default',
                },
                {
                    key: '2',
                    ns: 'nh1bkdx2',
                    cluster: 'cluster',
                    baseSpace: 0,
                    owner,
                    cooperator: [],
                    state: 'default',
                },
                {
                    key: '3',
                    ns: 'nh1bkdx2',
                    cluster: 'cluster',
                    baseSpace: -1,
                    owner,
                    cooperator: [],
                    state: 'default',
                },
            ]);
            setLoading(false);
        }, 3_000);
    }, []);

    const updateData = useCallback(function (index: number, ns: NsType) {
        setData((prevState) => {
            prevState[index] = ns;

            return [...prevState];
        });
    }, []);

    const importNs = useCallback(
        (index: number) => {
            const lastState = data[index].state;

            setData((prevState) => {
                const ns = prevState[index];
                ns.state = 'import';
                ns.error = undefined;

                console.warn('ns', prevState[index]);
                return [...prevState];
            });

            setTimeout(() => {
                setData((prevState) => {
                    const ns = prevState[index];

                    if (lastState === 'import') {
                        ns.state = 'error';
                        ns.error = 'import error';

                        prevState[index] = ns;

                        return [...prevState];
                    } else if (lastState === 'error') {
                        prevState.splice(index, 1);

                        message.success(`${ns.cluster}-${ns.ns} 导入成功`);
                        return [...prevState];
                    }

                    return prevState;
                });
            }, 3_000);
        },
        [data]
    );

    const importAll = useCallback(() => {
        let newData = data.map((ns) => {
            ns.state = 'import';
            ns.error = undefined;

            return ns;
        });

        setData(newData);

        setTimeout(() => {
            newData = [];

            data.forEach((ns) => {
                if (ns.state === 'import') {
                    ns.state = 'error';
                    ns.error = 'import error';
                } else if (ns.state !== 'error') {
                    return;
                }
                newData.push(ns);
            });

            setData(newData);
        }, 3_000);
    }, [data]);

    const columns: ColumnsType<NsType> = [
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
            render: BaseSpace,
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            key: 'owner',
            render(value, { state }, index: number) {
                return (
                    <SelectOwnerUser
                        user={user}
                        value={value}
                        disabled={state === 'import'}
                        onChange={(owner) => updateData(index, { ...data[index], owner })}
                    />
                );
            },
        },
        {
            title: '共享用户',
            dataIndex: 'cooperator',
            key: 'cooperator',
            width: '31%',
            render(value, { state }, index: number) {
                return (
                    <SelectCooperator
                        user={user}
                        value={value}
                        disabled={state === 'import'}
                        onChange={(cooperator) => updateData(index, { ...data[index], cooperator })}
                    />
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'state',
            key: 'state',
            width: '100px',
            render(state: NsType['state'], __, index) {
                return (
                    <Button
                        className="rounded-l"
                        onClick={() => importNs(index)}
                        loading={state === 'import'}
                    >
                        {state === 'error' ? '重新导入' : '导入'}
                    </Button>
                );
            },
        },
        {
            dataIndex: 'error',
            key: 'error',
            render(value) {
                if (value) {
                    return (
                        <Tooltip className="flex items-center" title={value}>
                            <IconFail className="mr-1" />
                            导入失败
                        </Tooltip>
                    );
                }
            },
        },
    ];

    return (
        <Tailwind className="ns bg">
            <div className="header">
                <b>待导入开发空间({data.length})</b>
                <Button type="primary" className="rounded-l" onClick={importAll}>
                    导入当前所有
                </Button>
            </div>
            {loading || data.length ? (
                <Table loading={loading} pagination={false} dataSource={data} columns={columns} />
            ) : (
                <NotData msg="当前暂无待导入开发空间" />
            )}
        </Tailwind>
    );
};
export default NSImport;
