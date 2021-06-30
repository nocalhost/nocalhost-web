import React from 'react';
import { FC, useState, useEffect } from 'react';
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
    useDataProvider,
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
    liItem: {
        listStyle: 'none',
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

const MeshDevSpaceForm = () => {
    const classes = useStyles();
    const dataProvider = useDataProvider();

    const [apps, setApps] = useState([]);
    const [spaceId, setSpaceId] = useState('');

    const queryMeshInfo = async (id: string) => {
        try {
            const result = await dataProvider.getMeshAppInfo(id);
            const tmpData = result.data ? result.data.apps : [];
            setApps(tmpData);
        } catch (e) {
            setApps([]);
        }
    };

    useEffect(() => {
        queryMeshInfo(spaceId);
    }, [spaceId]);

    return (
        <FormDataConsumer>
            {({ formData, ...rest }) => {
                formData.base_dev_space_id && setSpaceId(formData.base_dev_space_id);
                return (
                    formData.base_dev_space_id && (
                        <div>
                            <ul>
                                {apps.map((item: any, key) => {
                                    return (
                                        <li key={key}>
                                            <div>{item.name}</div>
                                            <ul>
                                                {item.workloads.map(
                                                    (workload: any, loadIndex: number) => {
                                                        return (
                                                            <li
                                                                className={classes.liItem}
                                                                key={loadIndex}
                                                            >
                                                                <BooleanInput
                                                                    label={workload.name}
                                                                    defaultValue={
                                                                        workload.status
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    source={`mesh_dev_info.apps.${item.name}.${workload.name}`}
                                                                ></BooleanInput>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </ul>
                            <TextInput
                                {...rest}
                                label="resources.space.fields.header_key"
                                source="mesh_dev_info.header.key"
                                className={classes.inlineBlock}
                            />
                            <TextInput
                                {...rest}
                                label="resources.space.fields.header_value"
                                source="mesh_dev_info.header.value"
                            />
                        </div>
                    )
                );
            }}
        </FormDataConsumer>
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

    const classes = useStyles();

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
                <BooleanInput
                    source="mesh_dev_space"
                    label="resources.space.fields.mesh_dev_space"
                />
                <FormDataConsumer>
                    {({ formData }) =>
                        formData.mesh_dev_space && (
                            <div>
                                <ReferenceInput
                                    label="resources.space.fields.base_space_name"
                                    source="base_dev_space_id"
                                    reference="devspace"
                                    allowEmpty
                                    allowNull
                                    format={(v: any) => (!v ? null : v)}
                                    className={classes.inlineBlock}
                                >
                                    <SelectInput optionText="space_name" />
                                </ReferenceInput>
                                <MeshDevSpaceForm></MeshDevSpaceForm>
                            </div>
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
};

export default SpaceCreate;
