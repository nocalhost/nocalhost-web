import React, { useEffect, useState } from 'react';

import HTTP from '../../api/fetch';
import { Table, Popover, Modal, Button, message } from 'antd';
import Icon from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import TableSearchInput from '../../components/TableSearchInput';
import LabelSelect from '../../components/LabelSelect';
import BreadCard from '../../components/BreadCard';
import DevspaceForm from '../DevSpace/components/DevspaceForm';
import KubeConfig from './components/KubeConfig';
import { useHistory } from 'react-router-dom';
import {
    ContentWrap,
    ContentTitle,
    SearchBox,
    FlexBox,
    IconBox,
    PopItem,
    SpaceTypeItem,
    Dot,
    UserBox,
    UserName,
} from './style-components';
import CommonIcon from '../../components/CommonIcon';
import DeleteModal from '../../components/DeleteModal';
import NotData from '../../components/NotData';
import SearchNotData from '../../components/SearchNotData';
import { queryAllUser, queryAllCluster } from '../../services';

// import { ReactComponent as IconRefresh } from '../../images/icon/icon_btn_elected_refresh.svg';
// import { ReactComponent as IconNormalRefresh } from '../../images/icon/icon_btn_normal_refresh.svg';
import { ReactComponent as IconNormalEdit } from '../../images/icon/icon_btn_normal_edit.svg';
import { ReactComponent as IconSelectedEdit } from '../../images/icon/icon_btn_elected_edit.svg';
import { ReactComponent as IconNormalKube } from '../../images/icon/icon_btn_normal_kube.svg';
import { ReactComponent as IconSelectedKube } from '../../images/icon/icon_btn_elected_kube.svg';
import { ReactComponent as IconMore } from '../../images/icon/icon_more.svg';
import { ReactComponent as IconNormalDevspace } from '../../images/icon/icon_quarantine_space.svg';
import { ReactComponent as IconCooperation } from '../../images/icon/icon_label_cooperator.svg';
import { ReactComponent as IconViewer } from '../../images/icon/icon_label_viewer.svg';
import { ReactComponent as IconNormalCooperator } from '../../images/icon/icon_label_normal_cooperator.svg';
import { ReactComponent as IconNormalViewer } from '../../images/icon/icon_label_normal_viewer.svg';
import { ReactComponent as IconLimits } from '../../images/icon/icon_label_limits.svg';
import { ReactComponent as IconExplain } from '../../images/icon/icon_label_explain.svg';
import { ReactComponent as IconShareSpace } from '../../images/icon/icon_shareSpace.svg';
import { ReactComponent as IconQuarantineSpace } from '../../images/icon/icon_quarantineSpace.svg';
import { ReactComponent as IconAdd } from '../../images/icon/icon_add.svg';
interface RouteParams {
    id: string;
}

interface UserInfo {
    name: string;
}
interface UserProps {
    cooper_user: UserInfo[];
    viewer_user: UserInfo[];
}

interface SelectMap {
    text: any;
    value: any;
    label?: any;
}

interface IRecord {
    id: number;
    [index: string]: any;
}

interface FilterType {
    space_name: string;
    user_id: number | string;
    cluster_id: number | string;
}

const PopoverBox = (props: { record: UserProps }) => {
    const { record } = props;
    const { cooper_user, viewer_user } = record;
    return (
        <UserBox>
            <div>
                <FlexBox>
                    <Icon
                        component={IconNormalCooperator}
                        style={{ fontSize: 20, marginRight: 10, color: '#b6c2cd' }}
                    />
                    <span>Cooperator:</span>
                </FlexBox>
                <UserName style={{ minHeight: '40px' }}>
                    {cooper_user.map((item) => item.name).join('、')}
                </UserName>
            </div>
            <div>
                <FlexBox>
                    <Icon
                        component={IconNormalViewer}
                        style={{ fontSize: 20, marginRight: 10, color: '#b6c2cd' }}
                    />
                    <span>Viewer:</span>
                </FlexBox>
                <UserName>{viewer_user.map((item) => item.name).join('、')}</UserName>
            </div>
        </UserBox>
    );
};

const EnvList = () => {
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
                                <FlexBox>
                                    {record.space_name}
                                    {(record?.space_own_type?.Str === 'Cooperator' ||
                                        record?.space_own_type?.Str === 'Viewer') && (
                                        <Icon
                                            component={
                                                record?.space_own_type?.Str === 'Cooperator'
                                                    ? IconCooperation
                                                    : IconViewer
                                            }
                                            style={{ fontSize: 20, marginLeft: 4 }}
                                        />
                                    )}
                                </FlexBox>
                                <div></div>
                            </div>
                        </div>
                    </FlexBox>
                );
            },
        },
        {
            title: t('resources.space.fields.space_type'),
            width: '160px',
            key: 'space_type',
            render: (text: string, record: any) => {
                return (
                    <SpaceTypeItem name={record.space_type}>
                        <Icon
                            component={
                                record.space_type === 'IsolateSpace'
                                    ? IconQuarantineSpace
                                    : IconShareSpace
                            }
                            style={{ fontSize: 20, marginRight: 4 }}
                        />
                        {record.space_type}
                    </SpaceTypeItem>
                );
            },
        },
        {
            title: t('resources.space.fields.namespace'),
            key: 'namespace',
            dataIndex: 'namespace',
            render: (text: string, record: any) => {
                return (
                    <FlexBox>
                        {record.cluster_admin ? 'ClusterScope' : record.namespace}
                        {record.cluster_admin && (
                            <Popover>
                                <CommonIcon
                                    NormalIcon={IconLimits}
                                    style={{ fontSize: '20px', marginLeft: '8px' }}
                                    title={t('resources.space.fields.cluster_scope')}
                                ></CommonIcon>
                            </Popover>
                        )}
                    </FlexBox>
                );
            },
        },
        {
            title: t('resources.cluster.name'),
            key: 'cluster_id',
            width: '140px',
            dataIndex: 'cluster_name',
        },
        {
            title: t('resources.space.fields.resource_limit'),
            key: 'resource_limit',
            width: '140px',
            render: (text: string, record: any) => {
                return (
                    <FlexBox>
                        <Dot isActive={record.resource_limit_set}></Dot>
                        {record.resource_limit_set
                            ? t('resources.space.fields.resource_limit_set')
                            : t('resources.space.fields.resource_limit_unset')}
                    </FlexBox>
                );
            },
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
            width: '160px',
            dataIndex: 'user_name',
            render: (text: string, record: any) => {
                return record?.cooper_user?.length > 0 || record?.viewer_user?.length > 0 ? (
                    <Popover content={<PopoverBox record={record} />}>
                        <FlexBox>
                            {record.user_name}
                            <Icon component={IconExplain} style={{ fontSize: 20, marginLeft: 4 }} />
                        </FlexBox>
                    </Popover>
                ) : (
                    <FlexBox>{record.user_name}</FlexBox>
                );
            },
        },
        {
            title: t('common.operation'),
            width: '160px',
            key: 'operation',
            render: (text: string, record: any) => {
                return (
                    <FlexBox id="operation">
                        <IconBox onClick={() => handleEdit(record)}>
                            <CommonIcon
                                NormalIcon={IconNormalEdit}
                                HoverIcon={IconSelectedEdit}
                                style={{ fontSize: '20px' }}
                                title={t('common.bt.edit')}
                            ></CommonIcon>
                        </IconBox>
                        <IconBox onClick={() => handleKube(record)}>
                            <CommonIcon
                                NormalIcon={IconNormalKube}
                                HoverIcon={IconSelectedKube}
                                style={{ fontSize: '20px' }}
                                title="Kubeconfig"
                            ></CommonIcon>
                        </IconBox>
                        <Popover
                            trigger="click"
                            overlayClassName="operationPop"
                            content={
                                <>
                                    <PopItem onClick={() => handleReset(record)}>
                                        {t('common.bt.reset')}
                                    </PopItem>
                                    <PopItem onClick={() => handleDelete(record)}>
                                        {t('common.bt.delete')}
                                    </PopItem>
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

    const history = useHistory();

    if (id) {
        columns.splice(3, 1);
    }

    const [spaceList, setSpaceList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [userList, setUserList] = useState<SelectMap[]>([]);
    const [clusterList, setClusterList] = useState<SelectMap[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showKube, setShowKube] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [showReset, setShowReset] = useState<boolean>(false);
    const [record, setRecord] = useState<IRecord>();
    const [filterValue, setFilterValue] = useState<FilterType>({
        space_name: '',
        cluster_id: 'all',
        user_id: 'all',
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showTotal = () => {
        return `共${spaceList.length}条`;
    };

    useEffect(() => {
        querySpaceList();
    }, []);

    useEffect(() => {
        handleFilter();
    }, [filterValue]);

    function handleFilter() {
        const tmpList = spaceList.filter((item: any) => {
            const { space_name, cluster_id, user_id } = filterValue;
            const isNameValid = item.space_name.indexOf(space_name) > -1;
            if (id) {
                // env list page
                if (user_id === 'all') {
                    return isNameValid;
                } else {
                    return isNameValid && item.user_id === user_id;
                }
            } else {
                if (cluster_id === 'all' && user_id === 'all') {
                    return isNameValid;
                } else if (cluster_id === 'all') {
                    return isNameValid && item.user_id === user_id;
                } else if (user_id === 'all') {
                    return isNameValid && item.cluster_id === cluster_id;
                } else {
                    return (
                        isNameValid &&
                        item.item.user_id === user_id &&
                        item.cluster_id === cluster_id
                    );
                }
            }
        });
        setFilterList(tmpList);
    }

    function handleKube(record: any) {
        setShowKube(true);
        setRecord(record);
    }

    function handleEdit(record: any) {
        history.push({
            pathname: '/dashboard/space-operation',
            state: {
                record,
            },
        });
    }

    async function querySpaceList() {
        setIsLoading(true);
        const nameMap = await queryAllUser();
        const clusterMap = await queryAllCluster();
        const response = await HTTP.get(/* id ? `cluster/${id}/dev_space` : */ 'dev_space', null, {
            is_v2: true,
        });
        const tmpList = response.data.map((item: any) => {
            return {
                ...item,
                user_name: nameMap.get(item.user_id),
                cluster_name: clusterMap.get(item.cluster_id),
            };
        });
        setSpaceList(tmpList);
        setFilterList(tmpList);
        setUserList([
            { value: 'all', text: t('common.select.all') },
            ...Array.from(nameMap).map((item) => {
                return {
                    value: item[0],
                    text: item[1],
                    label: item[1],
                };
            }),
        ]);

        setClusterList([
            { value: 'all', text: t('common.select.all') },
            ...Array.from(clusterMap).map((item) => {
                return {
                    value: item[0],
                    text: item[1],
                    label: item[1],
                };
            }),
        ]);
        setIsLoading(false);
    }

    function handleSearchInput(value: string) {
        setFilterValue({
            ...filterValue,
            space_name: value,
        });
    }

    function handleSearchCluster(value: string | number) {
        setFilterValue({
            ...filterValue,
            cluster_id: value,
        });
    }

    function handleSearchUser(value: string | number) {
        setFilterValue({
            ...filterValue,
            user_id: value,
        });
    }

    function handleDelete(record: any) {
        setShowDelete(true);
        setRecord(record);
    }

    function handleReset(record: any) {
        setShowReset(true);
        setRecord(record);
    }

    const handleSubmit = () => {
        setShowModal(false);
        querySpaceList();
    };

    const handleConfirmDelete = async () => {
        const response = await HTTP.delete(`dev_space/${record?.id}`);
        if (response.code === 0) {
            querySpaceList();
            message.success(t('common.message.delete'));
            setShowDelete(false);
        }
    };

    const handleConfirmReset = async () => {
        const response = await HTTP.post(`dev_space/${record?.id}/recreate`);
        if (response.code === 0) {
            message.success(t('common.message.reset'));
            setShowReset(false);
        }
    };

    return (
        <>
            {id && (
                <BreadCard
                    data={{
                        menu: t('resources.cluster.name'),
                        subMenu: t('resources.cluster.envList'),
                        route: '/dashboard/clusters',
                    }}
                />
            )}
            <ContentWrap>
                <ContentTitle>
                    <SearchBox>
                        <TableSearchInput
                            placeholder={t('resources.devSpace.tips.searchSpaceName')}
                            onConfirm={handleSearchInput}
                        />
                        <LabelSelect
                            style={{ marginRight: 12 }}
                            label={t('resources.space.fields.space_type')}
                            option={[{ value: 'all', text: t('common.select.all') }]}
                            onChange={handleSearchInput}
                        />
                        {!id && (
                            <LabelSelect
                                style={{ marginRight: 12 }}
                                label={t('resources.cluster.name')}
                                option={clusterList}
                                onChange={handleSearchCluster}
                            />
                        )}
                        <LabelSelect
                            label={t('resources.space.fields.user')}
                            option={userList}
                            onChange={handleSearchUser}
                        />
                    </SearchBox>
                    <FlexBox>
                        {/* <IconBox onClick={querySpaceList}>
                            <CommonIcon
                                style={{ fontSize: '24px' }}
                                NormalIcon={IconNormalRefresh}
                                HoverIcon={IconRefresh}
                            />
                        </IconBox> */}
                        {!id && (
                            <Button
                                type="primary"
                                icon={<Icon component={IconAdd} style={{ color: '#fff' }}></Icon>}
                                onClick={() => setShowModal(true)}
                            >
                                {t('resources.space.actions.create')}
                            </Button>
                        )}
                    </FlexBox>
                </ContentTitle>
                {filterList.length === 0 && !isLoading ? (
                    !filterValue.space_name ? (
                        <NotData />
                    ) : (
                        <SearchNotData />
                    )
                ) : (
                    <Table
                        style={{ padding: '0 10px' }}
                        tableLayout="fixed"
                        columns={columns}
                        loading={isLoading}
                        rowKey={(record) => record.id}
                        dataSource={filterList}
                        pagination={{
                            position: ['bottomCenter'],
                            showTotal: showTotal,
                            showSizeChanger: false,
                        }}
                    ></Table>
                )}
            </ContentWrap>
            {showModal && (
                <Modal
                    visible={showModal}
                    width={680}
                    title={t('resources.devSpace.actions.createDev')}
                    onCancel={() => setShowModal(false)}
                    footer={null}
                >
                    <DevspaceForm
                        userList={userList}
                        clusterList={clusterList}
                        onSubmit={handleSubmit}
                        onCancel={() => setShowModal(false)}
                    />
                </Modal>
            )}
            {showKube && <KubeConfig record={record} onCancel={() => setShowKube(false)} />}
            {showDelete && (
                <DeleteModal
                    onCancel={() => setShowDelete(false)}
                    onConfirm={handleConfirmDelete}
                    title={t('resources.devSpace.tips.deleteTitle')}
                    visible={true}
                    message={t('resources.devSpace.tips.deleteContent', {
                        name: record?.space_name,
                    })}
                />
            )}
            {showReset && (
                <DeleteModal
                    onCancel={() => setShowReset(false)}
                    onConfirm={handleConfirmReset}
                    title={t('resources.devSpace.tips.resetTitle')}
                    visible={true}
                    message={t('resources.devSpace.tips.resetContent', {
                        name: record?.space_name,
                    })}
                />
            )}
        </>
    );
};

export default EnvList;
