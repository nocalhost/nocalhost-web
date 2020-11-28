import React from 'react';
import { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ShowProps,
    useTranslate,
    useShowController,
    DeleteWithConfirmButton,
} from 'react-admin';
import KubeConfigField from '../components/KubeConfigField';

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
    const translate = useTranslate();
    const { record } = useShowController(props);
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <TextField label="resources.cluster.fields.cluster_name" source="name" />
                <TextField label="resources.cluster.fields.marks" source="marks" />
                <TextField
                    label="resources.cluster.fields.cluster_version"
                    source="info.cluster_version"
                />
                <TextField label="resources.cluster.fields.nodes_count" source="info.nodes" />
                <KubeConfigField label="resources.cluster.fields.kubeconfig" source="kubeconfig" />
                <DeleteWithConfirmButton
                    confirmTitle={translate('resources.cluster.delete.confirm.title', {
                        name: record && record.name,
                    })}
                    confirmContent={translate('resources.cluster.delete.confirm.content')}
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default ClusterShow;
