import React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput,
    CreateProps,
    useTranslate,
    TextInput,
    BooleanInput,
    FormDataConsumer,
    regex,
} from 'react-admin';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { validateText } from '../common/validation';
import { cpuLimitValidate, cpuReqValidate, memLimitValidate, memReqValidate } from './validation';

const Title = () => {
    const translate = useTranslate();
    return <span>{translate('resources.space.actions.create')}</span>;
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
    inlineBlock: {
        width: '257px',
        marginRight: '1rem',
    },
});
const reg = /^([0-9.]+)$/;

const validate = regex(reg, 'Must be a valid value');

const ResourceLimitForm = ({ ...rest }: any) => {
    const classes = useStyles();
    return (
        <div>
            <ResourceLimitTips title="resources.space.devspaceLimitTitle" {...rest} />
            <NumberInput
                {...rest}
                label="resources.space.fields.requestTotalMem"
                source="space_resource_limit.space_req_mem"
                validate={validate}
                className={classes.inlineBlock}
            />
            <NumberInput
                label="resources.space.fields.limitTotalMem"
                source="space_resource_limit.space_limits_mem"
                validate={validate}
                className={classes.inlineBlock}
            />
            <br />
            <NumberInput
                {...rest}
                label="resources.space.fields.requestTotalCPU"
                source="space_resource_limit.space_req_cpu"
                validate={validate}
                className={classes.inlineBlock}
            />
            <NumberInput
                {...rest}
                label="resources.space.fields.limitTotalCPU"
                source="space_resource_limit.space_limits_cpu"
                validate={validate}
            />
            <br />
            <NumberInput
                {...rest}
                label="resources.space.fields.PVC_num"
                source="space_resource_limit.space_pvc_count"
                className={classes.inlineBlock}
            />
            <NumberInput
                {...rest}
                label="resources.space.fields.storageCapacity"
                source="space_resource_limit.space_storage_capacity"
                validate={validate}
                className={classes.inlineBlock}
            />
            <br />
            <NumberInput
                {...rest}
                label="resources.space.fields.lbNum"
                source="space_resource_limit.space_lb_count"
            />
            <ResourceLimitTips title="resources.space.containerDefaultTitle" {...rest} />
            <NumberInput
                {...rest}
                label="resources.space.fields.requestMem"
                source="space_resource_limit.container_req_mem"
                validate={memReqValidate}
                className={classes.inlineBlock}
            />
            <NumberInput
                {...rest}
                label="resources.space.fields.limitMem"
                source="space_resource_limit.container_limits_mem"
                validate={memLimitValidate}
            />
            <br />
            <NumberInput
                {...rest}
                label="resources.space.fields.requestCPU"
                source="space_resource_limit.container_req_cpu"
                validate={cpuReqValidate}
                className={classes.inlineBlock}
            />
            <NumberInput
                {...rest}
                label="resources.space.fields.limitCPU"
                source="space_resource_limit.container_limits_cpu"
                validate={cpuLimitValidate}
            />
        </div>
    );
};

const SpaceCreate: FC<CreateProps> = (props: CreateProps) => {
    // eslint-disable-next-line
    // @ts-ignore
    const transform = (data: any) => ({
        ...data,
        cluster_id: data.cluster_id,
        cpu: parseInt(data.cpu) || 0,
        memory: parseInt(data.memory) || 0,
        user_id: data.user_id,
        space_name: data.space_name || '',
    });
    const postDefaultValue = () => ({});

    return (
        <Create title={<Title />} transform={transform} {...props}>
            <SimpleForm
                redirect={`/devspace`}
                sanitizeEmptyValues={false}
                initialValues={postDefaultValue()}
            >
                <TextInput label="resources.space.fields.space_name" source="space_name" />
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
                <BooleanInput source="cluster_admin" label="resources.space.fields.cluster_admin" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        !formData.cluster_admin && (
                            <div>
                                <BooleanInput
                                    source="isLimit"
                                    label="resources.space.fields.resource_limit"
                                />
                                {formData.isLimit && (
                                    <ResourceLimitForm {...rest}></ResourceLimitForm>
                                )}
                            </div>
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
};

export default SpaceCreate;
