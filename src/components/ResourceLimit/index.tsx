import React, { useState } from 'react';

import { Form, Input } from 'antd';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LimitWrap = styled.div`
    max-height: 280px;
    overflow: scroll;

    .divide {
        height: 1px;
        background: #e6ebf2;
    }

    .title {
        margin: 12px 0;
        color: rgb(54, 67, 92);
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        font-weight: 600;
    }

    .list-item {
        display: flex;
    }
`;

interface IProps {
    canSetLimit: boolean;
}

const ResourceLimit = ({ canSetLimit }: IProps) => {
    const { t } = useTranslation();
    const [space_req_mem, set_space_req_mem] = useState();
    const [space_limits_mem, set_space_limits_mem] = useState();
    const [space_req_cpu, set_space_req_cpu] = useState();
    const [space_limits_cpu, set_space_limits_cpu] = useState();
    return (
        <LimitWrap>
            <div className="divide"></div>
            <div className="title">{t('resources.space.devspaceLimitTitle')}</div>
            <div className="list-item">
                <Form.Item
                    name="space_req_mem"
                    label={t('resources.space.fields.requestTotalMem')}
                    style={{ width: '100%', marginRight: 12, flexBasis: '50%' }}
                >
                    <Input
                        disabled={!canSetLimit}
                        onChange={(e: any) => set_space_req_mem(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="space_limits_mem"
                    label={t('resources.space.fields.limitTotalMem')}
                    style={{ flexBasis: '50%' }}
                >
                    <Input
                        disabled={!canSetLimit}
                        onChange={(e: any) => set_space_limits_mem(e.target.value)}
                    />
                </Form.Item>
            </div>
            <div className="list-item">
                <Form.Item
                    name="space_req_cpu"
                    label={t('resources.space.fields.requestTotalCPU')}
                    style={{ width: '100%', marginRight: 12, flexBasis: '50%' }}
                >
                    <Input
                        disabled={!canSetLimit}
                        onChange={(e: any) => set_space_req_cpu(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="space_limits_cpu"
                    label={t('resources.space.fields.limitTotalCPU')}
                    style={{ flexBasis: '50%' }}
                >
                    <Input
                        disabled={!canSetLimit}
                        onChange={(e: any) => set_space_limits_cpu(e.target.value)}
                    />
                </Form.Item>
            </div>
            <div className="list-item">
                <Form.Item
                    name="space_pvc_count"
                    label={t('resources.space.fields.PVC_num')}
                    style={{ width: '100%', marginRight: 12, flexBasis: '50%' }}
                >
                    <Input disabled={!canSetLimit} />
                </Form.Item>
                <Form.Item
                    name="space_storage_capacity"
                    label={t('resources.space.fields.storageCapacity')}
                    style={{ flexBasis: '50%' }}
                >
                    <Input disabled={!canSetLimit} />
                </Form.Item>
            </div>
            <div className="list-item">
                <Form.Item
                    name="space_lb_count"
                    label={t('resources.space.fields.lbNum')}
                    style={{ width: '100%', marginRight: 12, flexBasis: '50%' }}
                >
                    <Input disabled={!canSetLimit} />
                </Form.Item>
                <Form.Item style={{ flexBasis: '50%', visibility: 'hidden' }} />
            </div>
            <div className="title">{t('resources.space.containerDefaultTitle')}</div>
            <div className="list-item">
                <Form.Item
                    name="container_req_mem"
                    label={t('resources.space.fields.requestTotalMem')}
                    style={{ width: '100%', marginRight: 12, flexBasis: '50%' }}
                    rules={[
                        {
                            required: !!space_req_mem,
                        },
                    ]}
                >
                    <Input disabled={!canSetLimit} />
                </Form.Item>

                <Form.Item
                    name="container_limits_mem"
                    label={t('resources.space.fields.limitTotalMem')}
                    style={{ flexBasis: '50%' }}
                    rules={[
                        {
                            required: !!space_limits_mem,
                        },
                    ]}
                >
                    <Input disabled={!canSetLimit} />
                </Form.Item>
            </div>
            <div className="list-item">
                <Form.Item
                    name="container_req_cpu"
                    label={t('resources.space.fields.requestTotalCPU')}
                    style={{ width: '100%', marginRight: 12, flexBasis: '50%' }}
                    rules={[
                        {
                            required: !!space_req_cpu,
                        },
                    ]}
                >
                    <Input disabled={!canSetLimit} />
                </Form.Item>
                <Form.Item
                    name="container_limits_cpu"
                    label={t('resources.space.fields.limitTotalCPU')}
                    style={{ flexBasis: '50%' }}
                    rules={[
                        {
                            required: !!space_limits_cpu,
                        },
                    ]}
                >
                    <Input disabled={!canSetLimit} />
                </Form.Item>
            </div>
        </LimitWrap>
    );
};

export default ResourceLimit;
