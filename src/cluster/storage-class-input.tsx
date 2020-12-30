import React, { FC, useEffect, useState } from 'react';
import { fetchUtils, SelectInput, Loading } from 'react-admin';
import { Cluster, Result } from '../types';

interface StorageClassInputProps {
    formData: Cluster;
}

const StorageClassInput: FC<StorageClassInputProps> = (props: StorageClassInputProps) => {
    const EMPTY_ITEM = { id: '', name: 'Default' };
    const [list, setList] = useState([]);

    const fetchStorageClassList = async () => {
        const token = localStorage.getItem('token');
        const options = {
            user: { authenticated: true, token: `Bearer ${token}` },
        };
        let apiUrl = '';
        // eslint-disable-next-line
        // @ts-ignore
        const apiHost = window._env_.API_HOST || window.location.origin;
        if (apiHost.indexOf('http') >= 0) {
            apiUrl = apiHost;
        } else {
            apiUrl = `http://${apiHost}`;
        }
        if (props.formData.id) {
            const url = `${apiUrl}/v1/cluster/${props.formData.id}/storage_class`;
            const result = await fetchUtils.fetchJson(url, options).then((result: Result) => {
                if (result.json.code === 0) {
                    const list = result.json.data.type_name || [];
                    return list.map((item: string) => ({ id: item, name: item }));
                } else {
                    return [];
                }
            });
            result.unshift(EMPTY_ITEM);
            setList(result);
        }
    };

    useEffect(() => {
        fetchStorageClassList();
    }, [props.formData.id]);
    if (list && list.length > 0) {
        return (
            <SelectInput
                source="storage_class"
                label="resources.cluster.fields.storage_class"
                choices={list}
            />
        );
    } else {
        return <Loading />;
    }
};

export default StorageClassInput;
