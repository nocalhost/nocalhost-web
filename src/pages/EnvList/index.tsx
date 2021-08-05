import React, { useEffect, useState, PropsWithChildren } from 'react';

import HTTP from '../../api/fetch';
import { Table, Popover } from 'antd';
import Icon from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import TableSearchInput from '../../components/TableSearchInput';
import LabelSelect from '../../components/LabelSelect';
import {
    ContentWrap,
    ContentTitle,
    SearchBox,
    FlexBox,
    IconBox,
    PopItem,
    OverflowItem,
    SpaceTypeItem,
} from './style-components';
import CommonIcon from '../../components/CommonIcon';
import { queryAllUser } from '../../services';

import { ReactComponent as IconRefresh } from '../../images/icon/icon_btn_elected_refresh.svg';
import { ReactComponent as IconNormalRefresh } from '../../images/icon/icon_btn_normal_refresh.svg';
import { ReactComponent as IconNormalEdit } from '../../images/icon/icon_btn_normal_edit.svg';
import { ReactComponent as IconSelectedEdit } from '../../images/icon/icon_btn_elected_edit.svg';
import { ReactComponent as IconNormalKube } from '../../images/icon/icon_btn_normal_kube.svg';
import { ReactComponent as IconSelectedKube } from '../../images/icon/icon_btn_elected_kube.svg';
import { ReactComponent as IconMore } from '../../images/icon/icon_more.svg';
import { ReactComponent as IconNormalDevspace } from '../../images/icon/icon_normal_devspace.svg';
interface RouteParams {
    id: string;
}

const EnvList = ({ children }: PropsWithChildren<{}>) => {
    const params = useParams<RouteParams>();
    const { t } = useTranslation();
    const { id } = params;
    const columns = [
        {
            title: t('resources.space.fields.space_name'),
            key: 'space_name',
            dataIndex: 'space_name',
            render: (text: string, record: any) => {
                return (
                    <FlexBox>
                        <Icon component={IconNormalDevspace} style={{ fontSize: 32 }} />
                        <div style={{ maxWidth: '85%', marginLeft: 10 }}>
                            <div>
                                <div>{record.space_name}</div>
                                <div></div>
                            </div>
                            <div>
                                <Popover content="开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述">
                                    <OverflowItem>
                                        开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述开发空间描述
                                    </OverflowItem>
                                </Popover>
                            </div>
                        </div>
                    </FlexBox>
                );
            },
        },
        {
            title: t('resources.space.fields.space_type'),
            key: 'space_type',
            render: (text: string, record: any) => {
                return <SpaceTypeItem>{record.space_type}</SpaceTypeItem>;
            },
        },
        {
            title: t('resources.space.fields.namespace'),
            key: 'namespace',
            dataIndex: 'namespace',
        },
        {
            title: t('resources.space.fields.resource_limit'),
            key: 'resource_limit',
        },
        {
            title: t('resources.space.fields.created_at'),
            key: 'created_at',
            dataIndex: 'created_at',
            render: (text: string, record: any) => {
                return <span>{moment(record.created_at).format('YYYY-MM-DD hh:mm:ss')}</span>;
            },
        },
        {
            title: t('resources.space.fields.user'),
            key: 'user',
            dataIndex: 'user_name',
        },
        {
            title: t('common.operation'),
            width: '160px',
            key: 'operation',
            render: () => {
                return (
                    <FlexBox>
                        <IconBox>
                            <CommonIcon
                                NormalIcon={IconNormalEdit}
                                HoverIcon={IconSelectedEdit}
                                style={{ fontSize: '20px' }}
                            ></CommonIcon>
                        </IconBox>
                        <IconBox>
                            <CommonIcon
                                NormalIcon={IconNormalKube}
                                HoverIcon={IconSelectedKube}
                                style={{ fontSize: '20px' }}
                            ></CommonIcon>
                        </IconBox>
                        <Popover
                            trigger="click"
                            content={
                                <>
                                    <PopItem>{t('common.bt.reset')}</PopItem>
                                    <PopItem>{t('common.bt.delete')}</PopItem>
                                </>
                            }
                        >
                            <Icon component={IconMore} />
                        </Popover>
                    </FlexBox>
                );
            },
        },
    ];

    const [spaceList, setSpaceList] = useState([]);

    const showTotal = () => {
        return `共${spaceList.length}条`;
    };

    useEffect(() => {
        querySpaceList();
    }, []);

    async function querySpaceList() {
        const nameMap = await queryAllUser();
        const response = await HTTP.get(id ? `cluster/${id}/dev_space` : 'dev_space');
        setSpaceList(
            response.data.map((item: any) => {
                return {
                    ...item,
                    user_name: nameMap.get(item.user_id),
                };
            })
        );
    }

    function handleSearchInput(value: string) {
        console.log(value);
    }

    return (
        <ContentWrap>
            <ContentTitle>
                <SearchBox>
                    <TableSearchInput onConfirm={handleSearchInput} />
                    <LabelSelect
                        style={{ marginRight: 12 }}
                        label={t('resources.space.fields.space_type')}
                        option={[]}
                        onChange={handleSearchInput}
                    />
                    <LabelSelect
                        label={t('resources.space.fields.user')}
                        option={[]}
                        onChange={handleSearchInput}
                    />
                </SearchBox>
                <div>
                    <IconBox>
                        <CommonIcon
                            style={{ fontSize: '24px' }}
                            NormalIcon={IconNormalRefresh}
                            HoverIcon={IconRefresh}
                        />
                    </IconBox>
                    {children}
                </div>
            </ContentTitle>
            <Table
                tableLayout="fixed"
                columns={columns}
                dataSource={spaceList}
                pagination={{
                    position: ['bottomCenter'],
                    showTotal: showTotal,
                    showSizeChanger: true,
                }}
            ></Table>
        </ContentWrap>
    );
};

export default EnvList;
