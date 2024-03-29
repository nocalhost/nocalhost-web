import { Button, message } from 'antd';
import React, { FC, PropsWithChildren, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import F2 from '@antv/f2';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';

import { ReactComponent as IconCluster } from '../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconProfile } from '../../../images/icon/profile_boy.svg';
import { ReactComponent as IconDelete } from '../../../images/icon/icon_btn_del.svg';
import { ReactComponent as IconData } from '../../../images/icon/icon_resource_data.svg';
import AddCluster from '../../../components/AddCluster';
import CommonIcon from '../../../components/CommonIcon';
import { ReactComponent as IconHelp } from '../../../images/icon/icon_label_query.svg';
import { ClusterItemInfo } from '../../../types/index';
import DeleteModal from '../../../components/DeleteModal';

import HTTP from '../../../api/fetch';

import './index.less';

const { Shape, Util, Global, G, Animate } = F2;
const { Vector2 } = G;

const UNITMAP: {
    [index: string]: any;
} = {
    pods: '',
    cpu: 'Core',
    memory: 'GB',
    storage: 'Gi',
};
interface IProps extends PropsWithChildren<{}> {
    data: ClusterItemInfo;
    onSubmit: () => void;
}

const ListBox = styled.div`
    padding: 14px;
    display: flex;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(40, 47, 55, 0.05);
    margin-bottom: 16px;

    &:hover {
        box-shadow: 0 8px 20px 0 rgba(40, 47, 55, 0.15);

        .delete {
            visibility: visible;
        }
    }
`;

const DetailContainer = styled.div`
    width: 284px;
    margin-right: 20px;
    font-size: 14px;
`;

const LoadContainer = styled.div`
    height: 336px;
    flex: 1;
    display: flex;
    padding: 12px 20px 0;
    background: rgb(249, 251, 253);
    border-radius: 0;
`;

const ClusterName = styled.span`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

const InfoTitle = styled.h3`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
`;

const Flex1Ul = styled.ul`
    flex: 1;
    padding-top: 10px;
    margin-left: 47px;
`;

const DetailTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    padding-top: 6px;
`;

const DetailIcon = styled.div`
    width: 32px;
    height: 32px;
    margin-right: 10px;
`;

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const DetailItem = styled.li`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: center;
    line-height: 20px;
    margin-bottom: 16px;
`;

const DetailItemLabel = styled.span`
    color: #79879c;
`;

const Line1px = styled.div`
    height: 1px;
    background: #f3f6fa;
`;

const BtnBox = styled.div`
    margin: 20px 0 6px;
    display: flex;
    align-items: center;
`;

const WorkLoadItem = styled.li`
    display: flex;
    height: 66px;
    padding-left: 20px;
    align-items: center;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgb(218, 225, 232);
    border-radius: 4px;

    &:nth-child(4) {
        margin-bottom: 0;
    }
`;

const WorkLoadInfoItem = styled(FlexColumnDiv)`
    flex-basis: 33.33%;
`;

const NumSpan = styled.span`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

const LabelSpan = styled.span`
    color: rgb(121, 135, 156);
    font-family: PingFangSC-Regular;
    font-size: 12px;
    font-weight: normal;
`;

const Dot = styled.span<{ name: String }>`
    display: inline-block;
    background: ${(props) =>
        props.name === 'cpu'
            ? '#49a5ff'
            : props.name === 'memory'
            ? '#1ee7e7'
            : props.name === 'pods'
            ? '#ffd05a'
            : '#fe8afe'};
    height: 8px;
    width: 8px;
    border-radius: 50%;
    margin-right: 6px;
`;

const ListItem: FC<IProps> = ({ data, onSubmit }: IProps) => {
    const info = JSON.parse(data.info);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const history = useHistory();
    const { t, i18n } = useTranslation();
    let { resources = [] } = data;
    const { modifiable } = data;
    try {
        resources = resources.sort(
            (a: any, b: any) => a.resource_name[0].charCodeAt() - b.resource_name[0].charCodeAt()
        );
    } catch (e) {
        resources = [
            {
                resource_name: 'pods',
                capacity: 0,
                used: 0,
                percentage: 0,
            },
            {
                resource_name: 'cpu',
                capacity: 0,
                used: 0,
                percentage: 0,
            },
            {
                resource_name: 'memory',
                capacity: 0,
                used: 0,
                percentage: 0,
            },
            {
                resource_name: 'storage',
                capacity: 0,
                used: 0,
                percentage: 0,
            },
        ];
    }

    const chart1 = useRef<any>();

    useEffect(() => {
        chart1.current = new F2.Chart({
            id: `chart${data.id}`,
            pixelRatio: window.devicePixelRatio,
            height: 324,
        });
    }, []);

    useEffect(() => {
        const loadInfoData = resources.map((item: any) => {
            return {
                ...item,
                percentage: item.percentage * 100 * 0.75,
                resource_name: t(`resources.cluster.${item.resource_name}`),
            };
        });

        Shape.registerShape('interval', 'tick', {
            draw: function draw(cfg: any, container: any) {
                const points = this.parsePoints(cfg.points);
                const style = Util.mix(
                    {
                        stroke: cfg.color,
                    },
                    Global.shape.interval,
                    cfg.style
                );
                if (cfg.isInCircle) {
                    let newPoints = points.slice(0);
                    if (this._coord.transposed) {
                        newPoints = [points[0], points[3], points[2], points[1]];
                    }

                    const _cfg$center = cfg.center,
                        x = _cfg$center.x,
                        y = _cfg$center.y;

                    const v = [1, 0];
                    const v0 = [newPoints[0].x - x, newPoints[0].y - y];
                    const v1 = [newPoints[1].x - x, newPoints[1].y - y];
                    const v2 = [newPoints[2].x - x, newPoints[2].y - y];

                    let startAngle = Vector2.angleTo(v, v1);
                    let endAngle = Vector2.angleTo(v, v2);
                    const r0 = Vector2.length(v0);
                    const r = Vector2.length(v1);

                    if (startAngle >= 1.5 * Math.PI) {
                        startAngle = startAngle - 2 * Math.PI;
                    }

                    if (endAngle >= 1.5 * Math.PI) {
                        endAngle = endAngle - 2 * Math.PI;
                    }

                    const lineWidth = r - r0;
                    const newRadius = r - lineWidth / 2;

                    return container.addShape('Arc', {
                        className: 'interval',
                        attrs: Util.mix(
                            {
                                x,
                                y,
                                startAngle,
                                endAngle,
                                r: newRadius,
                                lineWidth,
                                lineCap: 'react',
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 0,
                            },
                            style
                        ),
                    });
                }
            },
        });

        // 注册自定义动画
        Animate.registerAnimation('waveIn', function (shape, animateCfg) {
            const startAngle = shape.attr('startAngle');
            const endAngle = shape.attr('endAngle');
            shape.attr('endAngle', startAngle);
            shape.animate().to(
                Util.mix(
                    {
                        attrs: {
                            endAngle,
                        },
                    },
                    animateCfg
                )
            );
        });
        const chart = chart1.current;
        chart.clear();

        chart.source(loadInfoData.reverse(), {
            percentage: {
                max: 100,
            },
        });

        chart.coord('polar', {
            transposed: true,
            innerRadius: 0.3,
            radius: 0.82,
        });
        chart.axis(false);
        const colorArr = ['#49a5ff', '#1ee7e7', '#ffd05a', '#fe8afe'];
        const legendArr = resources.map((item, index) => {
            return {
                name: t(`resources.cluster.${item.resource_name}`),
                marker: {
                    symbol: 'circle',
                    fill: colorArr[index],
                    radius: 4,
                },
            };
        });
        chart.legend({
            position: 'bottom',
            custom: true,
            items: legendArr,
            itemWidth: 60,
            offsetY: -20,
            fontSize: 14,
        });

        // 将数据映射到上面注册的Shape——interval，并绑定动画
        chart
            .interval()
            .position('resource_name*percentage')
            .color('resource_name', colorArr.reverse())
            .shape('tick')
            .size(12)
            .animate({
                appear: {
                    animation: 'waveIn',
                    duration: 1500,
                    easing: 'elasticOut',
                },
                update: {
                    duration: 1500,
                    easing: 'elasticOut',
                },
            });

        loadInfoData.forEach(function (obj) {
            chart.guide().arc({
                start: [obj.resource_name, 0],
                end: [obj.resource_name, 75],
                top: false,
                style: {
                    lineWidth: 12,
                    stroke: '#e8edf4',
                },
            });
        });

        const listStr = resources
            .map((item) => {
                return `<li style="height: 16px; font-size: 12px; display: flex; align-items: center; justify-content: flex-end; margin-bottom: 4px;"><span>${t(
                    'resources.cluster.' + item.resource_name
                )}</span><span style="display: inline-block; font-weight: 600; width: 30px;"> ${(
                    item.percentage * 100
                ).toFixed(0)}%</span></li>`;
            })
            .join('');
        chart.guide().html({
            position: [0, 0],
            offsetX: -68,
            offsetY: -25,
            html: `
                <div>
                    <ul style="width: 120px;text-align: right; font-size: 12px; color: #36435c">
                     ${listStr}
                    </ul>
                </div>
            `,
        });
        chart.render();
    }, [i18n.language]);

    const handleEdit = () => {
        setShowEdit(true);
    };

    const handleEnvList = (id: number) => {
        history.push(`/dashboard/clusters-env-list/${id}`);
    };

    const onEdit = () => {
        setShowEdit(false);
        onSubmit();
    };

    async function handleDelete() {
        const response = await HTTP.delete(`cluster/${data.id}`);
        if (response.code === 0) {
            message.success(t('common.message.delete'));
            setShowDelete(false);
            onSubmit();
        }
    }

    const ResourceTip = () => {
        return (
            <>
                <span>{t('resources.cluster.tips.resourceTip')}</span>
                <br />
                <span>{t('resources.cluster.tips.resourceTip2')}</span>
            </>
        );
    };

    return (
        <ListBox>
            <DetailContainer>
                <DetailTitle>
                    <DetailIcon>
                        <Icon style={{ fontSize: '32px' }} component={IconCluster} />
                    </DetailIcon>
                    <FlexColumnDiv>
                        <ClusterName>{data.name}</ClusterName>
                    </FlexColumnDiv>
                </DetailTitle>
                <ul>
                    <DetailItem>
                        <DetailItemLabel>
                            {t('resources.cluster.fields.cluster_version')}
                        </DetailItemLabel>
                        <span>{info.cluster_version}</span>
                    </DetailItem>
                    <DetailItem>
                        <DetailItemLabel>
                            {t('resources.cluster.fields.storage_class')}
                        </DetailItemLabel>
                        <span>{data.storage_class}</span>
                    </DetailItem>
                    <DetailItem>
                        <DetailItemLabel>
                            {t('resources.cluster.fields.nodes_count')}
                        </DetailItemLabel>
                        <span>{info.nodes}</span>
                    </DetailItem>
                    <DetailItem>
                        <DetailItemLabel>
                            {t('resources.cluster.fields.users_count')}
                        </DetailItemLabel>
                        <span>{data.users_count}</span>
                    </DetailItem>
                    <DetailItem>
                        <DetailItemLabel>
                            {t('resources.cluster.fields.created_at')}
                        </DetailItemLabel>
                        <span>{moment(data.created_at).format('YYYY/MM/DD hh:mm:ss')}</span>
                    </DetailItem>
                    <DetailItem>
                        <DetailItemLabel>{t('resources.cluster.fields.user')}</DetailItemLabel>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <Icon
                                component={IconProfile}
                                style={{ fontSize: 24, marginRight: 6 }}
                            />
                            {data.userName}
                        </span>
                    </DetailItem>
                </ul>
                <Line1px />
                <BtnBox>
                    {modifiable && (
                        <Button style={{ marginRight: 20 }} onClick={handleEdit}>
                            {t('resources.cluster.edit')}
                        </Button>
                    )}
                    <Button style={{ marginRight: 20 }} onClick={() => handleEnvList(data.id)}>
                        {t('resources.cluster.envList')}
                    </Button>
                    {modifiable && (
                        <div
                            className="delete"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowDelete(true)}
                        >
                            <CommonIcon
                                title={t('common.bt.delete')}
                                NormalIcon={IconDelete}
                                style={{ fontSize: '20px' }}
                            />
                        </div>
                    )}
                </BtnBox>
            </DetailContainer>
            <LoadContainer>
                <div>
                    <InfoTitle>
                        <Icon component={IconData} style={{ fontSize: 20, marginRight: 6 }} />
                        {t('resources.cluster.workload')}
                        <CommonIcon
                            NormalIcon={IconHelp}
                            title={<ResourceTip />}
                            style={{ fontSize: 20, marginLeft: 6 }}
                        />
                    </InfoTitle>
                    <canvas
                        style={{ position: 'relative', top: '-20px' }}
                        id={`chart${data.id}`}
                        height={284}
                    ></canvas>
                </div>
                <Flex1Ul>
                    {resources.map((item, key) => {
                        return (
                            <WorkLoadItem key={key}>
                                <WorkLoadInfoItem>
                                    <NumSpan>{`${(item.percentage * 100).toFixed(0)}%`}</NumSpan>
                                    <LabelSpan>
                                        <Dot name={item.resource_name} />
                                        {t(`resources.cluster.${item.resource_name}`)}
                                    </LabelSpan>
                                </WorkLoadInfoItem>
                                <WorkLoadInfoItem>
                                    <NumSpan>{`${item.used} ${
                                        UNITMAP[item.resource_name]
                                    }`}</NumSpan>
                                    <LabelSpan>{t('resources.cluster.used')}</LabelSpan>
                                </WorkLoadInfoItem>
                                <WorkLoadInfoItem>
                                    <NumSpan>{`${item.capacity} ${
                                        UNITMAP[item.resource_name]
                                    }`}</NumSpan>
                                    <LabelSpan>{t('resources.cluster.total')}</LabelSpan>
                                </WorkLoadInfoItem>
                            </WorkLoadItem>
                        );
                    })}
                </Flex1Ul>
            </LoadContainer>
            {showEdit && (
                <AddCluster
                    isEdit={true}
                    record={data}
                    onSubmit={onEdit}
                    onCancel={() => setShowEdit(false)}
                />
            )}

            <DeleteModal
                visible={showDelete}
                title={t('resources.cluster.delete.confirm.title')}
                message={t('resources.cluster.delete.confirm.content')}
                onConfirm={handleDelete}
                onCancel={() => setShowDelete(false)}
            />
        </ListBox>
    );
};

export default ListItem;
