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
    useGetOne,
} from 'react-admin';
import searchToObj from '../utils/searchToObj';

const Title = ({ application }: any) => {
    const { data, loading } = useGetOne('application', application);
    if (loading || !data) {
        return <span>Create Space</span>;
    }
    return <span>Application {data.context.application_name} Create Space</span>;
};

const SpaceCreate: FC<CreateProps> = (props: CreateProps) => {
    const redirect = useRedirect();
    // eslint-disable-next-line
    // @ts-ignore
    const params = searchToObj(props.location.search);
    if (!params.application) {
        redirect('/application');
    }
    const postDefaultValue = () => ({ application_id: params.application });
    return (
        <Create title={<Title application={params.application} />} {...props}>
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
