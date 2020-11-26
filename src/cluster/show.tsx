import React from 'react';
import { FC } from 'react';
import { Show, SimpleShowLayout, TextField, ShowProps, useTranslate } from 'react-admin';
import ClusterVersionField from './ClusterVersionField';
import NodesField from './NodesFields';
import KubeConfigField from './KubeConfigField';

const Title = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <span>
            {translate('resources.cluster.name', { smart_count: 1 })}{' '}
            {record ? `"${record.name}"` : ''}
        </span>
    );
};

const ClusterShow: FC<ShowProps> = (props) => {
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <TextField label="resources.cluster.fields.cluster_name" source="name" />
                <TextField label="resources.cluster.fields.marks" source="marks" />
                <ClusterVersionField
                    label="resources.cluster.fields.cluster_version"
                    source="info"
                />
                <NodesField label="resources.cluster.fields.nodes_count" source="info" />
                <KubeConfigField label="resources.cluster.fields.kubeconfig" source="kubeconfig" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ClusterShow;
