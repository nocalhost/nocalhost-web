import React, { useEffect, useState } from 'react';

import HTTP from '../../api/fetch';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

interface RouteParams {
    id: string;
}

const EnvList = () => {
    const params = useParams<RouteParams>();
    const { t } = useTranslation();
    const { id } = params;
    const columns = [
        {
            title: t('resources.space.fields.space_name'),
            key: 'space_name',
            dataIndex: 'space_name',
        },
        {
            title: t('resources.space.fields.space_type'),
            key: 'space_type',
        },
        {
            title: t('resources.space.fields.namespace'),
            key: 'namespace',
            dataIndex: 'namespace',
        },
        {
            title: t('resources.space.fields.resource_limit'),
            key: 'resource_limit',
        },
        {
            title: t('resources.space.fields.created_at'),
            key: 'created_at',
            dataIndex: 'created_at',
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any) => {
                return <span>{moment(record.created_at).format('YYYY-MM-DD hh:mm:ss')}</span>;
            },
        },
        {
            title: t('resources.space.fields.user'),
            key: 'user',
            dataIndex: 'user_id',
        },
        {
            title: t('common.operation'),
            key: 'operation',
        },
    ];

    const [spaceList, setSpaceList] = useState([]);

    useEffect(() => {
        querySpaceList();
    }, []);

    async function querySpaceList() {
        const response = await HTTP.get(id ? `cluster/${id}/dev_space` : 'dev_space');
        setSpaceList(response.data);
    }

    return (
        <div>
            <Table columns={columns} dataSource={spaceList}></Table>
        </div>
    );
};

export default EnvList;
