import React, { FC, useEffect, useState } from 'react';
import { fetchUtils, SelectInput } from 'react-admin';
import { Base64 } from 'js-base64';

interface StorageClassInputProps {
    formData: any;
}

const StorageClassInput: FC<StorageClassInputProps> = (props: StorageClassInputProps) => {
    const EMPTY_ITEM = { id: '', name: 'Do not use' };
    const [list, setList] = useState([]);

    const fetchStorageClassList = async () => {
        const token = localStorage.getItem('token');
        const options = {
            user: { authenticated: true, token: `Bearer ${token}` },
        };
        // eslint-disable-next-line
        // @ts-ignore
        const apiUrl = window._env_.API_HOST || window.location.origin;
        let url;
        if (props.formData.id) {
            url = `http://${apiUrl}/v1/cluster/${props.formData.id}/storage_class`;
            const result = await fetchUtils.fetchJson(url, options).then((result: any) => {
                if (result.json.code === 0) {
                    const list = result.json.data.type_name || [];
                    return list.map((item: string) => ({ id: item, name: item }));
                } else {
                    return [];
                }
            });
            result.unshift(EMPTY_ITEM);
            setList(result);
        } else {
            url = `http://${apiUrl}/v1/cluster/kubeconfig/storage_class`;
            const result = await fetchUtils
                .fetchJson(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        kubeconfig: Base64.encode(props.formData.kubeconfig, false),
                    }),
                    ...options,
                })
                .then((result: any) => {
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
    }, [props.formData]);
    return (
        <SelectInput
            source="storage_class"
            label="resources.cluster.fields.storage_class"
            choices={list}
        />
    );
};

export default StorageClassInput;
