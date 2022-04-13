import { Button, message, Switch, Table, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllUser, UserType } from '../../../services';
import { ColumnsType } from 'antd/lib/table/interface';
import { SelectCooperator, SelectOwnerUser } from './user';
import { ReactComponent as IconFail } from '../../User/Import/asset/fail.svg';
import { Tailwind } from '../../../components/Tailwind/style-components';
import NotData from '../../../components/NotData';
import HTTP from '../../../api/fetch';

const BaseSpace = (props: { ns: NsType; onChange: (checked: boolean) => void }) => {
    const { IstioEnabled: value, state } = props.ns;

    const disabled = state === 'import' || value !== 1;

    const defaultChecked = value === 2;

    useEffect(() => {
        props.onChange(value === 2);
    }, []);

    const node = (
        <Switch defaultChecked={defaultChecked} disabled={disabled} onChange={props.onChange} />
    );

    if (value === 1) {
        return node;
    }

    return <Tooltip title={value === 2 ? '已是基础开发空间' : '未安装istio'}>{node}</Tooltip>;
};

interface NsType {
    Name: string;
    Cluster: string;
    IstioEnabled: number;
    owner?: number;
    cooperator: Array<number>;
    state: 'import' | 'error' | 'default';
    is_basespace: number;
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

            const owner = res.data?.id;

            const { data } = await HTTP.get<Array<NsType>>('dev_space/ns_list', null, {
                is_v2: true,
            });
            data.forEach((item) => (item.owner = owner));

            setData(data);
            setLoading(false);
        });
    }, []);

    const updateData = useCallback(function (index: number, ns: NsType) {
        setData((prevState) => {
            prevState[index] = ns;

            return [...prevState];
        });
    }, []);

    const importNs = useCallback(
        (index: number) => {
            const ns = data[index];
            setData((prevState) => {
                const ns = prevState[index];
                ns.state = 'import';
                ns.error = undefined;

                return [...prevState];
            });

            const { is_basespace, owner, cooperator } = ns;

            HTTP.post<{ Success: boolean; ErrInfo: string }>(
                'dev_space/ns_import',
                {
                    cluster_name: ns.Cluster,
                    namespace: ns.Name,
                    owner,
                    is_basespace,
                    cooperator,
                },
                { is_v2: true }
            ).then((res) => {
                setData((prevState) => {
                    const index = prevState.findIndex(
                        (item) => item.Cluster === ns.Cluster && item.Name === ns.Name
                    )!;
                    const cns = prevState[index];

                    if (res.data.Success) {
                        prevState.splice(index, 1);
                        message.success(`${ns.Cluster}-${ns.Name} 导入成功`);
                    } else {
                        cns.state = 'error';
                        cns.error = res.data.ErrInfo;

                        prevState[index] = ns;
                    }

                    return [...prevState];
                });
            });
        },
        [data]
    );

    const importAll = useCallback(() => {
        data.forEach((_, index) => {
            importNs(index);
        });
    }, [data, importNs]);

    const columns: ColumnsType<NsType> = [
        {
            title: '命名空间',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: '集群',
            dataIndex: 'Cluster',
            key: 'Cluster',
        },
        {
            title: '基础开发空间(Mesh)',
            dataIndex: 'IstioEnabled',
            key: 'IstioEnabled',
            render(_, ns, index) {
                return (
                    <BaseSpace
                        ns={ns}
                        onChange={(checked) => {
                            const newData = [...data];
                            newData[index].is_basespace = checked ? 1 : 0;

                            setData(newData);
                        }}
                    />
                );
            },
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
            width: '120px',
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
            width: '200px',
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
                <Table
                    rowKey={(record) => record.Cluster + record.Name}
                    loading={loading}
                    pagination={false}
                    dataSource={data}
                    columns={columns}
                />
            ) : (
                <NotData msg="当前暂无待导入开发空间" />
            )}
        </Tailwind>
    );
};
export default NSImport;
