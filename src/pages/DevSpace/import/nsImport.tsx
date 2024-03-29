import { Button, message, Switch, Table, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getAllUser, UserType } from '../../../services';
import { ColumnsType } from 'antd/lib/table/interface';
import { NsType, SelectCooperator, SelectOwnerUser } from './user';
import { ReactComponent as IconFail } from '../../User/Import/asset/fail.svg';
import { Tailwind } from '../../../components/Tailwind/style-components';
import NotData from '../../../components/NotData';
import HTTP from '../../../api/fetch';

const BaseSpace = (props: { ns: NsType; onChange: (checked: boolean) => void }) => {
    const { t } = useTranslation();
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

    return (
        <Tooltip
            title={
                value === 2
                    ? t('resources.devSpace.import.tips.isstioEnabled')
                    : t('resources.devSpace.import.tips.require')
            }
        >
            {node}
        </Tooltip>
    );
};

const NSImport = () => {
    const [user, setUser] = useState(Array.of<UserType>());
    const [data, setData] = useState(Array.of<NsType>());
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

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

            const { is_basespace, owner, collaborator } = ns;

            HTTP.post<{ Success: boolean; ErrInfo: string }>(
                'dev_space/ns_import',
                {
                    cluster_name: ns.Cluster,
                    namespace: ns.Name,
                    owner,
                    is_basespace,
                    collaborator,
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
                        message.success(
                            `${ns.Cluster}-${ns.Name} ${t('common.import.result.successfully')}`
                        );
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

    const [selectedRowKeys, setSelectedRowKeys] = useState(Array.of<string>());

    const importSelect = useCallback(() => {
        data.forEach((item, index) => {
            if (selectedRowKeys.includes(`${item.Cluster},${item.Name}`)) {
                importNs(index);
            }
        });
    }, [data, importNs, selectedRowKeys]);

    const columns: ColumnsType<NsType> = [
        {
            title: t('resources.devSpace.fields.namespace'),
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: t('resources.devSpace.fields.cluster'),
            dataIndex: 'Cluster',
            key: 'Cluster',
        },
        {
            title: `${t('resources.meshSpace.basicSpace')}(Mesh)`,
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
            title: t('resources.devSpace.fields.user'),
            dataIndex: 'owner',
            key: 'owner',
            render(value, { state }, index: number) {
                return (
                    <SelectOwnerUser
                        user={user}
                        value={value}
                        disabled={state === 'import'}
                        onChange={(owner) => {
                            const item = data[index];
                            item.owner = owner;
                            item.collaborator = (item.collaborator ?? []).filter(
                                (id) => id !== owner
                            );
                            updateData(index, { ...item });
                        }}
                    />
                );
            },
        },
        {
            title: t('resources.devSpace.fields.shareUsers'),
            dataIndex: 'collaborator',
            key: 'collaborator',
            width: '31%',
            render(value, { owner, state }, index: number) {
                return (
                    <SelectCooperator
                        user={user}
                        owner={owner}
                        value={value}
                        disabled={state === 'import'}
                        onChange={(collaborator) =>
                            updateData(index, { ...data[index], collaborator })
                        }
                    />
                );
            },
        },
        {
            title: t('resources.devSpace.import.btn.operation'),
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
                        {state === 'error'
                            ? t('common.import.btn.reimport')
                            : t('common.import.btn.import')}
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
                            {t('common.import.result.failure')}
                        </Tooltip>
                    );
                }
            },
        },
    ];
    const onSelectChange = useCallback((selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    }, []);
    return (
        <Tailwind className="ns bg">
            <div className="header">
                <b>
                    {t('resources.devSpace.import.importedCount')}({data.length})
                </b>
                <Button
                    type="primary"
                    className="rounded-l"
                    disabled={selectedRowKeys.length === 0}
                    onClick={importSelect}
                >
                    {t('resources.devSpace.import.btn.importSelect')}
                </Button>
            </div>
            {loading || data.length ? (
                <Table
                    className="px-5"
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        onChange: onSelectChange,
                    }}
                    rowKey={(record) => `${record.Cluster},${record.Name}`}
                    loading={loading}
                    pagination={false}
                    dataSource={data}
                    columns={columns}
                />
            ) : (
                <NotData />
            )}
        </Tailwind>
    );
};
export default NSImport;
