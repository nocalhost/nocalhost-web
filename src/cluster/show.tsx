import * as React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

const Title = ({ record }: any) => {
    return <span>Cluster {record ? `"${record.name}"` : ''}</span>;
};

const ClusterShow = (props: any) => {
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="cluster_id" />
                <TextField source="cpu" />
                <TextField source="memory" />
                <TextField source="user_id" />
                <TextField source="application_id" />
                <TextField source="kubeconfig" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ClusterShow;
