import React from 'react';
import { List, H, I, Flex, Name } from './style-components';
import { Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import { useHistory } from 'react-router';
import { ReactComponent as IconCluster } from '../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconUserAvater } from '../../../images/icon/profile_boy.svg';
import { useTranslation } from 'react-i18next';
import { ClusterItemType } from '../type';
import { UserType } from '../../User/const';
import moment from 'moment';
interface PropsType {
    item: ClusterItemType;
    user: UserType;
}

export function ListItem(props: PropsType) {
    const { t } = useTranslation();
    const item = props.item;
    const infoParse = JSON.parse(item?.info || '{}');
    const time = moment(item.created_at).format('YYYY-MM-DD hh:mm:ss');
    const history = useHistory();
    return (
        <List onClick={() => history.push('/dashboard/clusters')}>
            <Row gutter={20}>
                <Col span={6}>
                    <Flex>
                        <Icon component={IconCluster} style={{ fontSize: '32px' }}></Icon>
                        <div style={{ marginLeft: '12px' }}>
                            <Name>{item.name}</Name>
                            <I>{t('resources.cluster.fields.name')}</I>
                        </div>
                    </Flex>
                </Col>
                <Col span={5}>
                    <H>{infoParse.cluster_version}</H>
                    <I>{t('resources.cluster.fields.cluster_version')}</I>
                </Col>
                <Col span={2}>
                    <H>{item.storage_class || ' '}</H>
                    <I>{t('resources.cluster.fields.storage_class')}</I>
                </Col>
                <Col span={2}>
                    <H>{infoParse.nodes}</H>
                    <I>{t('resources.cluster.fields.nodes_count')}</I>
                </Col>
                <Col span={2}>
                    <H>{item.users_count || ' '}</H>
                    <I>{t('resources.cluster.fields.users_count')}</I>
                </Col>
                <Col span={4}>
                    <H>{time}</H>
                    <I>{t('resources.cluster.fields.created_at')}</I>
                </Col>
                <Col span={3}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '4px' }}>
                            <Icon component={IconUserAvater} style={{ fontSize: '20px' }}></Icon>
                        </div>

                        <H>{props.user.name}</H>
                    </div>

                    <I>{t('resources.cluster.fields.user')}</I>
                </Col>
            </Row>
        </List>
    );
}
