import React from 'react';
import { Main, Card, CardTop, CardInfo, CardInfoTitle, CardInfoSub } from './style-components';

interface summaryPropsType {
    title: string;
}

function SummaryCard(props: summaryPropsType) {
    return (
        <Main>
            <Card>
                <CardTop>
                    <CardInfo>
                        <CardInfoTitle>{props.title}</CardInfoTitle>
                        <CardInfoSub>
                            提供 KubeSphere、Kubernetes 和 OpenPitrix
                            集群内各项服务组件的健康状态监控，可以查看当前集群的健康状态和运行时间，能够帮助用户监测集群的状况和及时定位问题。
                        </CardInfoSub>
                    </CardInfo>
                </CardTop>
            </Card>
        </Main>
    );
}

export default SummaryCard;
