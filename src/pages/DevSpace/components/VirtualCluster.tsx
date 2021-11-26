import React, { useState, useCallback, useRef } from 'react';
import { Form, Switch, Radio, Select, Input } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';

import { ReactComponent as IconBaseSpace } from '../../../images/icon/icon_switch_baseSpace.svg';
import {
    FormFlexBox,
    OtherConfigItem,
    DescBox,
    Divide,
    LimitWrap,
    LimitTitle,
} from './DevspaceForm';

const HELM_VALUES_PLACEHOLDER = `# Below you can configure the virtual cluster"
storage:
 size:5Gi
# If you don't want to sync ingresses from the virtual cluster to
# the host cluster uncomment the next lines
# syncer:
# extraArgs: [“--disable-sync-resources=ingresses"]`;

const Tips = styled.span`
    position: relative;
    margin-left: 40px;
    top: -15px;
    height: 16px;
    font-size: 12px;
    color: #79879c;
`;
const Container = styled.div`
    height: 0;
    overflow: hidden;
`;
const Arrow = styled.i`
    position: relative;
    margin-right: 8px;
    &::before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: middle;
        border-top: 5.5px solid transparent;
        border-bottom: 5.5px solid transparent;
        border-left: 6px solid #000;
        transition: 50ms ease-in;
    }

    &.open {
        &::before {
            transform: rotate(90deg);
        }
    }
`;

export default function VirtualCluster() {
    const [isVCluster, setIsVCluster] = useState(false);

    const container = useRef<HTMLDivElement | null>(null);

    const more = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            const div = event.currentTarget;

            const i: any = div.lastElementChild;

            const isExist = i.className.includes('open');

            i.classList[isExist ? 'remove' : 'add']('open');

            if (container.current) {
                container.current.style.height = isExist ? '0' : 'auto';
            }
        },
        [container]
    );

    return (
        <>
            <OtherConfigItem>
                <Icon component={IconBaseSpace} style={{ fontSize: 32, marginRight: 8 }} />
                <FormFlexBox>
                    <DescBox>
                        <span>设置为虚拟集群</span>
                        <span>{`设置为虚拟集群之后怎么样这里说明一下（最好不可超过一行）`}</span>
                    </DescBox>
                    <Form.Item name="dev_space_type">
                        <Switch onChange={setIsVCluster} checked={isVCluster} />
                    </Form.Item>
                </FormFlexBox>
            </OtherConfigItem>
            {isVCluster && (
                <LimitWrap>
                    <Divide />
                    <LimitTitle>集群访问方式</LimitTitle>
                    <Form.Item name="service_type">
                        <Radio.Group>
                            <Radio value="ClusterIP">仅限插件访问</Radio>
                            <Radio value="LoadBalancer">LoadBalancer</Radio>
                            <Radio value="NodePort">NodePort</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <LimitTitle onClick={more} style={{ cursor: 'pointer' }}>
                        <Arrow />
                        高级配置
                    </LimitTitle>
                    <Container ref={container}>
                        <FormFlexBox>
                            <Form.Item
                                name="version"
                                label="VCluster 版本号"
                                style={{
                                    width: '100%',
                                    marginRight: 12,
                                    flexBasis: '100%',
                                }}
                            >
                                <Select
                                    disabled
                                    placeholder="请选择 VCluster 版本 "
                                    style={{ width: '100%' }}
                                >
                                    <Select.Option value="latest">latest</Select.Option>
                                </Select>
                            </Form.Item>
                        </FormFlexBox>
                        <Tips>部署虚拟集群的图表版本</Tips>
                        <FormFlexBox>
                            <Form.Item
                                name="values"
                                label="Helm Values"
                                style={{
                                    width: '100%',
                                    marginRight: 10,
                                    flexBasis: '100%',
                                }}
                            >
                                <Input.TextArea rows={8} placeholder={HELM_VALUES_PLACEHOLDER} />
                            </Form.Item>
                        </FormFlexBox>
                        <Tips>
                            {`所有可用值，请参考 `}
                            <a target="_bank" href="https://nocalhost.dev/docs/introduction">
                                https://nocalhost.dev/docs/introduction
                            </a>
                        </Tips>
                    </Container>
                </LimitWrap>
            )}
        </>
    );
}
