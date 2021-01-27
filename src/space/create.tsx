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
    TextInput,
    BooleanInput,
    FormDataConsumer,
    regex,
} from 'react-admin';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const ResourceLimitTips = ({ title }: any) => {
    const translate = useTranslate();

    return (
        <Typography variant="subtitle1" gutterBottom>
            {translate(title)}
        </Typography>
    );
};

const useStyles = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

const reg = /^([0-9.]+)$/;

const validate = regex(reg, 'Must be a valid value');

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
    const transform = (data: any) => ({
        ...data,
        cluster_id: data.cluster_id,
        cpu: parseInt(data.cpu) || 0,
        memory: parseInt(data.memory) || 0,
        user_id: data.user_id,
        space_name: data.space_name || '',
    });
    const postDefaultValue = () => ({ application_id: Number(p.application) });
    const classes = useStyles();
    return (
        <Create title={<Title application={p.application} />} transform={transform} {...props}>
            <SimpleForm
                redirect={`/space?application=${p.application}`}
                sanitizeEmptyValues={false}
                initialValues={postDefaultValue()}
            >
                <TextInput label="resources.space.fields.space_name" source="space_name" />
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
                    <SelectInput validate={validateText} optionText="name" />
                </ReferenceInput>
                <ReferenceInput
                    label="resources.space.fields.user"
                    source="user_id"
                    reference="users"
                >
                    <SelectInput validate={validateText} optionText="name" />
                </ReferenceInput>
                <BooleanInput source="isLimit" label="resources.space.fields.resource_limit" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <ResourceLimitTips
                                title="resources.space.devspaceLimitTitle"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.requestTotalMem"
                                source="space_resource_limit.space_req_mem"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.limitTotalMem"
                                source="space_resource_limit.space_limits_mem"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <div />
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.requestTotalCPU"
                                source="space_resource_limit.space_req_cpu"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.limitTotalCPU"
                                source="space_resource_limit.space_limits_cpu"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <div />
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.PVC_num"
                                source="space_resource_limit.space_pvc_count"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.storageCapacity"
                                source="space_resource_limit.space_storage_capacity"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.lbNum"
                                source="space_resource_limit.space_lb_count"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <ResourceLimitTips
                                title="resources.space.containerDefaultTitle"
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.requestMem"
                                source="space_resource_limit.container_req_mem"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.limitMem"
                                source="space_resource_limit.container_limits_mem"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <div />
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.requestCPU"
                                source="space_resource_limit.container_req_cpu"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer formClassName={classes.inlineBlock}>
                    {({ formData, ...rest }) =>
                        formData.isLimit && (
                            <NumberInput
                                label="resources.space.fields.limitCPU"
                                source="space_resource_limit.container_limits_cpu"
                                validate={validate}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
};

export default SpaceCreate;
