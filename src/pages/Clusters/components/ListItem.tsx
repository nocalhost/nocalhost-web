import { Button } from 'antd';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import i18n from '../../../i18n/i18n';
import F2 from '@antv/f2';
import moment from 'moment';
import EditCluster from './EditCluster';
import { useHistory } from 'react-router-dom';

const { Shape, Util, Global, G, Animate } = F2;

const { Vector2 } = G;

interface IProps extends PropsWithChildren<{}> {
    data: {
        id: number;
        info: string;
        name: string;
        server: string;
        storage_class: string;
        has_dev_space: boolean;
        users_count: number;
        created_at: string;
        user_id: number;
    };
}

const ListBox = styled.div`
    padding: 10px;
    display: flex;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(40, 47, 55, 0.05);
    margin-bottom: 16px;
`;

const DetailContainer = styled.div`
    width: 284px;
    margin-right: 20px;
    font-size: 14px;
`;

const LoadContainer = styled.div`
    flex: 1;
    padding: 10px 30px 30px 22px;
    background: rgb(249, 251, 253);
    border-radius: 0;
`;

const InfoTitle = styled.h3`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

const WorkLoadInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Flex1Ul = styled.ul`
    flex: 1;
`;

const DetailTitle = styled.div`
    display: flex;
    margin-bottom: 20px;
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
    margin-bottom: 16px;
`;

const Line1px = styled.div`
    height: 1px;
    background: #f3f6fa;
`;

const BtnBox = styled.div`
    margin: 20px 0 10px;
`;

const WorkLoadItem = styled.li`
    display: flex;
    height: 66px;
    padding-left: 20px;
    align-items: center;
    margin-bottom: 12px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgb(218, 225, 232);
    border-radius: 4px;
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

const ListItem: FC<IProps> = ({ data }: IProps) => {
    const info = JSON.parse(data.info);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const history = useHistory();
    useEffect(() => {
        const loadInfoData = [
            {
                name: '本地存储',
                percent: 23,
                icon: 'stand.png',
                color: '#fe8afe',
            },
            {
                name: '容器组',
                percent: 40,
                icon: 'walk.png',
                color: '#ffd05a',
            },
            {
                name: '内存',
                percent: 65,
                icon: 'run.png',
                color: '#1ee7e7',
            },
            {
                name: 'CPU',
                percent: 65,
                icon: 'run.png',
                color: '#49a5ff',
            },
        ];
        // 注册自定义Shape——极坐标下的条形
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
                                lineCap: 'round',
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

        const chart = new F2.Chart({
            id: `chart${data.id}`,
            pixelRatio: window.devicePixelRatio,
        });

        chart.source(loadInfoData, {
            percent: {
                max: 100,
            },
        });

        chart.coord('polar', {
            transposed: true,
            innerRadius: 0.382,
            radius: 0.8,
        });
        chart.axis(false);
        chart.legend({
            position: 'bottom',
            itemWidth: 80,
        });

        // 将数据映射到上面注册的Shape——interval，并绑定动画
        chart
            .interval()
            .position('name*percent')
            // .color('color', function (val) {
            //     return val;
            // })
            .color('name', ['#fe8afe', '#ffd05a', '#1ee7e7', '#49a5ff'])
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
                start: [obj.name, 0],
                end: [obj.name, 75],
                top: false,
                style: {
                    lineWidth: 12,
                    stroke: '#e8edf4',
                },
            });
        });

        chart.guide().html({
            position: [0, 0],
            offsetX: -100,
            offsetY: -22,
            html: `
                <div>
                    <ul style="width: 120px;text-align: right; font-size: 12px; color: #36435c">
                     <li><span>CPU</span><span></span></li>
                     <li><span>内存</span><span></span></li>
                     <li><span>容器组</span><span></span></li>
                     <li><span>本地存储</span><span></span></li>
                    </ul>
                </div>
            `,
        });

        chart.render();
    }, []);

    const handleEdit = () => {
        setShowEdit(true);
    };

    const handleEnvList = (id: number) => {
        history.push(`/dashboard/env-list/${id}`);
    };

    return (
        <ListBox>
            <DetailContainer>
                <DetailTitle>
                    <DetailIcon />
                    <FlexColumnDiv>
                        <span>{data.name}</span>
                        <span>集群描述信息</span>
                    </FlexColumnDiv>
                </DetailTitle>
                <ul>
                    <DetailItem>
                        <span>{i18n.t('resources.cluster.fields.cluster_version')}</span>
                        <span>{info.cluster_version}</span>
                    </DetailItem>
                    <DetailItem>
                        <span>{i18n.t('resources.cluster.fields.provider')}</span>
                        <span>{}</span>
                    </DetailItem>
                    <DetailItem>
                        <span>{i18n.t('resources.cluster.fields.storage_class')}</span>
                        <span>{data.storage_class}</span>
                    </DetailItem>
                    <DetailItem>
                        <span>{i18n.t('resources.cluster.fields.nodes_count')}</span>
                        <span>{info.nodes}</span>
                    </DetailItem>
                    <DetailItem>
                        <span>{i18n.t('resources.cluster.fields.users_count')}</span>
                        <span>{data.users_count}</span>
                    </DetailItem>
                    <DetailItem>
                        <span>{i18n.t('resources.cluster.fields.created_at')}</span>
                        <span>{moment(data.created_at).format('YYYY-MM-DD hh:mm:ss')}</span>
                    </DetailItem>
                    <DetailItem>
                        <span>{i18n.t('resources.cluster.fields.user')}</span>
                        <span>{data.user_id}</span>
                    </DetailItem>
                </ul>
                <Line1px />
                <BtnBox>
                    <Button style={{ marginRight: 20 }} onClick={handleEdit}>
                        {i18n.t('resources.cluster.edit')}
                    </Button>
                    <Button onClick={() => handleEnvList(data.id)}>
                        {i18n.t('resources.cluster.envList')}
                    </Button>
                </BtnBox>
            </DetailContainer>
            <LoadContainer>
                <InfoTitle>集群资源负载</InfoTitle>
                <WorkLoadInfo>
                    <canvas id={`chart${data.id}`} width="400" height="300"></canvas>
                    <Flex1Ul>
                        {[0, 1, 2, 3].map((item, key) => {
                            return (
                                <WorkLoadItem key={key}>
                                    <WorkLoadInfoItem>
                                        <NumSpan>88%</NumSpan>
                                        <LabelSpan>CPU</LabelSpan>
                                    </WorkLoadInfoItem>
                                    <WorkLoadInfoItem>
                                        <NumSpan>12Core</NumSpan>
                                        <LabelSpan>已使用</LabelSpan>
                                    </WorkLoadInfoItem>
                                    <WorkLoadInfoItem>
                                        <NumSpan>16Core</NumSpan>
                                        <LabelSpan>总计</LabelSpan>
                                    </WorkLoadInfoItem>
                                </WorkLoadItem>
                            );
                        })}
                    </Flex1Ul>
                </WorkLoadInfo>
            </LoadContainer>
            {showEdit && (
                <EditCluster
                    name={data.name}
                    storage_class={data.storage_class}
                    onCancel={() => setShowEdit(false)}
                />
            )}
        </ListBox>
    );
};

export default ListItem;