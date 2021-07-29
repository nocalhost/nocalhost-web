import React from 'react';
import SummaryCard from '../../components/SummaryCard';
import { ListItem } from './ListItem';
import { Row, Col } from 'antd';
import {
    Card,
    CardBox,
    H,
    Time,
    FlexBetween,
    Total,
    I,
    AmountBox,
    Water,
    Dot,
    Flex,
} from './style-components';
function Overview() {
    return (
        <>
            <SummaryCard title="123"></SummaryCard>
            <CardBox>
                <Row gutter={20}>
                    <Col span={8}>
                        <Card>
                            <Water>Users</Water>
                            <H mb="4px">用户</H>
                            <Time>2020/02/08-2021/07/28</Time>
                            <FlexBetween>
                                <AmountBox>
                                    <Total>3879</Total>
                                    <I>人</I>
                                </AmountBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Water>Application</Water>
                            <H mb="4px">用户</H>
                            <Time>2020/02/08-2021/07/28</Time>
                            <FlexBetween>
                                <AmountBox>
                                    <Total>3879</Total>
                                    <I>人</I>
                                </AmountBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Water>DevSpace</Water>
                            <H mb="4px">用户</H>
                            <Time>2020/02/08-2021/07/28</Time>
                            <FlexBetween>
                                <AmountBox>
                                    <Total>3879</Total>
                                    <I>人</I>
                                </AmountBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                </Row>
                <CardBox>
                    <Card>
                        <Flex mb="24px">
                            <H>集群信息</H>
                            <Dot>4</Dot>
                        </Flex>
                        <ListItem></ListItem>
                    </Card>
                </CardBox>
            </CardBox>
        </>
    );
}

export default Overview;
