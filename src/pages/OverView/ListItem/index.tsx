import React from 'react';
import { List, H, I, Flex } from './style-components';
import { Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import { ReactComponent as IconCluster } from '../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconUserAvater } from '../../../images/icon/profile_boy.svg';
export function ListItem() {
    return (
        <List>
            <Row gutter={20}>
                <Col span={6}>
                    <Flex>
                        <Icon component={IconCluster} style={{ fontSize: '32px' }}></Icon>
                        <div style={{ marginLeft: '12px' }}>
                            <H>devpool</H>
                            <I>集群描述信息集群描述信息…</I>
                        </div>
                    </Flex>
                </Col>
                <Col span={4}>
                    <H>coding-nocalhost</H>
                    <I>集群版本</I>
                </Col>
                <Col span={2}>
                    <H>腾讯云</H>
                    <I>服务商</I>
                </Col>
                <Col span={2}>
                    <H>cbs</H>
                    <I>存储类型</I>
                </Col>
                <Col span={2}>
                    <H>8</H>
                    <I>节点数量</I>
                </Col>
                <Col span={2}>
                    <H>98</H>
                    <I>DevSpace数量</I>
                </Col>
                <Col span={4}>
                    <H>2021/02/08 09:46:32</H>
                    <I>创建时间</I>
                </Col>
                <Col span={2}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '4px' }}>
                            <Icon component={IconUserAvater} style={{ fontSize: '20px' }}></Icon>
                        </div>

                        <H>百慕大大</H>
                    </div>

                    <I>创建者</I>
                </Col>
            </Row>
        </List>
    );
}
