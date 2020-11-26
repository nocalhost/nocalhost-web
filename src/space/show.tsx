import React, { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ShowProps,
    ReferenceField,
    BooleanField,
    useTranslate,
} from 'react-admin';
import KubeConfigField from '../cluster/KubeConfigField';

const Title = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <span>
            {translate('resources.space.name', { smart_count: 1 })}{' '}
            {record ? `"${record.namespace}"` : ''}
        </span>
    );
};

const SpaceShow: FC<ShowProps> = (props) => {
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <ReferenceField
                    label="resources.space.fields.application"
                    source="application_id"
                    reference="application"
                >
                    <TextField source="context.application_name" />
                </ReferenceField>
                <ReferenceField
                    label="resources.space.fields.cluster"
                    source="cluster_id"
                    reference="cluster"
                >
                    <TextField source="cluster_name" />
                </ReferenceField>
                <TextField label="resources.space.fields.cpu" source="cpu" />
                <TextField label="resources.space.fields.memory" source="memory" />
                <KubeConfigField label="resources.space.fields.kubeconfig" source="kubeconfig" />
                <BooleanField label="resources.space.fields.status" source="status" />
                <ReferenceField
                    label="resources.space.fields.user"
                    source="user_id"
                    reference="users"
                >
                    <TextField source="name" />
                </ReferenceField>
            </SimpleShowLayout>
        </Show>
    );
};

export default SpaceShow;
