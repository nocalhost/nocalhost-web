import React from 'react';
import { FC } from 'react';
import { Show, SimpleShowLayout, TextField, ShowProps } from 'react-admin';
import ClusterVersionField from './ClusterVersionField';
import NodesField from './NodesFields';
import KubeConfigField from './KubeConfigField';

const Title = ({ record }: any) => {
    return <span>Cluster {record ? `"${record.name}"` : ''}</span>;
};

const ClusterShow: FC<ShowProps> = (props) => {
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="marks" />
                <ClusterVersionField label="Cluster version" source="info" />
                <NodesField label="Nodes count" source="info" />
                <KubeConfigField source="kubeconfig" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ClusterShow;
