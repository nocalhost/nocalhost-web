import React, { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ShowProps,
    ReferenceField,
    BooleanField,
} from 'react-admin';
import KubeConfigField from '../cluster/KubeConfigField';

const SpaceShow: FC<ShowProps> = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <ReferenceField source="application_id" reference="application">
                    <TextField source="context.application_name" />
                </ReferenceField>
                <ReferenceField source="cluster_id" reference="cluster">
                    <TextField source="cluster_name" />
                </ReferenceField>
                <TextField source="cpu" />
                <TextField source="memory" />
                <KubeConfigField source="kubeconfig" />
                <BooleanField source="status" />
                <ReferenceField source="user_id" reference="users">
                    <TextField source="name" />
                </ReferenceField>
            </SimpleShowLayout>
        </Show>
    );
};

export default SpaceShow;
