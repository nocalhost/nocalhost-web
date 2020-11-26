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
    useTranslate,
} from 'react-admin';
import searchToObj from '../utils/searchToObj';
import { validateText } from '../common/validation';

const Title = ({ application }: any) => {
    const translate = useTranslate();
    const { data, loading } = useGetOne('application', application);
    if (loading || !data) {
        return <span>{translate('resources.space.actions.create')}</span>;
    }
    return (
        <span>
            {translate('resources.application.name', { smart_count: 1 })}{' '}
            {`"${data.context.application_name}"`} {translate('resources.space.actions.create')}
        </span>
    );
};

const SpaceCreate: FC<CreateProps> = (props: CreateProps) => {
    const hash = window.location.hash;
    const search = hash.substring(hash.indexOf('?'));
    const p = searchToObj(search);
    const redirect = useRedirect();
    // eslint-disable-next-line
    // @ts-ignore
    if (!p.application) {
        redirect('/application');
    }
    const postDefaultValue = () => ({ application_id: p.application });
    return (
        <Create title={<Title application={p.application} />} {...props}>
            <SimpleForm
                redirect={`/space?application=${p.application}`}
                sanitizeEmptyValues={false}
                initialValues={postDefaultValue()}
            >
                <ReferenceInput
                    label="resources.space.fields.application"
                    source="application_id"
                    disabled
                    reference="application"
                >
                    <SelectInput validate={validateText} optionText="context.application_name" />
                </ReferenceInput>
                <ReferenceInput
                    label="resources.space.fields.cluster"
                    source="cluster_id"
                    reference="cluster"
                >
                    <SelectInput validate={validateText} optionText="cluster_name" />
                </ReferenceInput>
                <NumberInput
                    validate={validateText}
                    label="resources.space.fields.cpu"
                    source="cpu"
                />
                <NumberInput
                    validate={validateText}
                    label="resources.space.fields.memory"
                    source="memory"
                />
                <ReferenceInput
                    label="resources.space.fields.user"
                    source="user_id"
                    reference="users"
                >
                    <SelectInput validate={validateText} optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};

export default SpaceCreate;
