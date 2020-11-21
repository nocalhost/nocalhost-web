import React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput,
    CreateProps,
    useRedirect,
} from 'react-admin';
import searchToObj from '../utils/searchToObj';

const SpaceCreate: FC<CreateProps> = (props: CreateProps) => {
    const redirect = useRedirect();
    // eslint-disable-next-line
    // @ts-ignore
    const params = searchToObj(props.location.search);
    if (!params.application_id) {
        redirect('/application');
    }
    const postDefaultValue = () => ({ application_id: params.application_id });
    return (
        <Create {...props}>
            <SimpleForm sanitizeEmptyValues={false} initialValues={postDefaultValue()}>
                <ReferenceInput source="application_id" disabled reference="application">
                    <SelectInput optionText="context.application_name" />
                </ReferenceInput>
                <ReferenceInput source="cluster_id" reference="cluster">
                    <SelectInput optionText="cluster_name" />
                </ReferenceInput>
                <NumberInput source="cpu" />
                <NumberInput source="memory" />
                <ReferenceInput source="user_id" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};

export default SpaceCreate;
