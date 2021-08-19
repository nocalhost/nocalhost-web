import React, { useState } from 'react';

import BreadCard from '../../../components/BreadCard';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Steps, Button, Form, Select } from 'antd';

const ContentWrap = styled.div`
    display: flex;
    padding: 24px;

    min-height: 772px;
    margin-right: 24px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(40, 47, 55, 0.05);

    .left {
        width: 420px;
        padding-right: 24px;

        .ant-steps-item-title {
            font-size: 12px;
        }

        .btn-box {
            display: flex;
            justify-content: flex-end;
        }
    }

    .right {
        flex: 1;

        background: linear-gradient(-180deg, rgb(235, 250, 255) 0%, rgb(255, 255, 255) 100%);
    }
`;

const MeshSpace = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <>
            <BreadCard
                data={{
                    menu: t('resources.devSpace.name'),
                    subMenu: t('resources.devSpace.createMesh'),
                    route: '/dashboard/devspace',
                }}
            />
            <ContentWrap>
                <div className="left">
                    <Steps
                        style={{ padding: '0 56px' }}
                        labelPlacement="vertical"
                        current={currentStep}
                    >
                        <Steps.Step title={t('resources.meshSpace.selectBasic')} />
                        <Steps.Step title={t('resources.meshSpace.create')} />
                    </Steps>
                    <Form layout="vertical" style={{ marginTop: 30 }}>
                        <Form.Item
                            label={t('resources.space.fields.user')}
                            rules={[{ required: true }]}
                        >
                            <Select />
                        </Form.Item>
                        <Form.Item
                            label={t('resources.space.fields.cluster')}
                            rules={[{ required: true }]}
                        >
                            <Select />
                        </Form.Item>
                        <Form.Item
                            label={t('resources.meshSpace.basicSpace')}
                            rules={[{ required: true }]}
                        >
                            <Select />
                        </Form.Item>
                    </Form>
                    <div className="btn-box">
                        <Button style={{ marginRight: 12 }}>{t('common.bt.cancel')}</Button>
                        <Button type="primary" onClick={() => setCurrentStep(1)}>
                            {t('common.bt.next')}
                        </Button>
                    </div>
                </div>
                <div className="right"></div>
            </ContentWrap>
        </>
    );
};

export default MeshSpace;
