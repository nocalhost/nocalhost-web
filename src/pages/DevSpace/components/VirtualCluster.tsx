import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Form, Switch, Radio, Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';
import styled from 'styled-components';

import HTTP from '../../../api/fetch';
import CommonIcon from '../../../components/CommonIcon';
import { ReactComponent as VClusterIcon } from '../../../images/icon/icon_switch_vcluster.svg';
import { ReactComponent as IconHelp } from '../../../images/icon/icon_label_query.svg';
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

const PlugInOnly = styled.div`
    display: flex;
    align-items: center;
    svg:hover {
        path {
            fill: #36445c;
        }
    }
`;
export default function VirtualCluster({
    changeIsVCluster,
}: {
    changeIsVCluster: (isVCluster: boolean) => void;
}) {
    const { t } = useTranslation();

    const [versions, setVersions] = useState([]);

    useEffect(() => {
        getVersion();
    }, []);

    const getVersion = useCallback(async () => {
        const {
            data: { versions },
        } = await HTTP.get('nocalhost/version/vcluster');
        setVersions(versions);
    }, []);

    const l = useCallback(
        (key: string) => {
            return t(`resources.space.fields.${key}`);
        },
        [t]
    );

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
                <Icon component={VClusterIcon} style={{ fontSize: 32, marginRight: 8 }} />
                <FormFlexBox>
                    <DescBox>
                        <span>{l('setVClusterTip')}</span>
                        <span>{l('setVClusterDesc')}</span>
                    </DescBox>
                    <Form.Item name="dev_space_type">
                        <Switch
                            checked={isVCluster}
                            onChange={(checked) => {
                                changeIsVCluster(checked);
                                setIsVCluster(checked);
                            }}
                        />
                    </Form.Item>
                </FormFlexBox>
            </OtherConfigItem>
            {isVCluster && (
                <LimitWrap>
                    <Divide />
                    <LimitTitle>{l('vClusterAccessWay')}</LimitTitle>
                    <Form.Item name="service_type">
                        <Radio.Group>
                            <Radio value="ClusterIP" style={{}}>
                                <PlugInOnly>
                                    {l('plugInOnly')}
                                    <CommonIcon
                                        NormalIcon={IconHelp}
                                        title={l('plugInOnlyTips')}
                                        style={{ fontSize: 16, marginLeft: 6 }}
                                    />
                                </PlugInOnly>
                            </Radio>
                            <Radio value="LoadBalancer">LoadBalancer</Radio>
                            <Radio value="NodePort">NodePort</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <LimitTitle onClick={more} style={{ cursor: 'pointer' }}>
                        <Arrow />
                        {l('vClusterSettings')}
                    </LimitTitle>
                    <Container ref={container}>
                        <FormFlexBox>
                            <Form.Item
                                name="version"
                                label={`VCluster ${l('vClusterVersion')}`}
                                style={{
                                    width: '100%',
                                    marginRight: 12,
                                    flexBasis: '100%',
                                }}
                            >
                                <Select style={{ width: '100%' }}>
                                    {versions.map((version) => (
                                        <Select.Option key={version} value={version}>
                                            {version}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </FormFlexBox>
                        <Tips>{l('vClusterVersionDesc')}</Tips>
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
                                <Input.TextArea rows={7} placeholder={HELM_VALUES_PLACEHOLDER} />
                            </Form.Item>
                        </FormFlexBox>
                        <Tips>
                            {l('vClusterHelmDesc')}
                            <a target="_bank" href="https://www.vcluster.com/docs/config-reference">
                                Configuration Reference
                            </a>
                        </Tips>
                    </Container>
                </LimitWrap>
            )}
        </>
    );
}
