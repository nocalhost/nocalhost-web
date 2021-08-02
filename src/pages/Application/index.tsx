import React, { useEffect, useState, Fragment } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { Table, Button, Popover, message } from 'antd';
import HTTP from '../../api/fetch';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined, FormOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import {
    TableBox,
    TableHeader,
    TableWrap,
    PopItem,
    Filter,
    AIcon,
    Flex,
    Sub,
} from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import moment from 'moment';
import CreateApplicationForm from './CreateApplicationForm';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../../components/DeleteModal';
import LabelSelect from '../../components/LabelSelect';
import { applictionOptions } from './const';
import { useHistory } from 'react-router-dom';
import { UserType } from '../User/const';

function Application() {
    const [data, setData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [popVisibleIndex, setPopVisibleIndex] = useState(-1);
    const [type, setType] = useState('');
    const [formData, setFormData] = useState({});
    const history = useHistory();
    const { t } = useTranslation();
    const getUser = async () => {
        try {
            const result = await HTTP.get('users');
            setUserList(result.data || []);
        } catch (error) {}
    };
    const getApplication = async () => {
        try {
            const result = await HTTP.get('application', {
                filter: {},
                range: [0, 9],
                sort: ['id', 'ASC'],
            });
            setData(result.data || []);
        } catch (error) {}
    };
    useEffect(() => {
        getApplication();
        getUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    const handleSelectChange = (v: any) => {
        console.log(v);
    };
    const handleDelete = async (id: string) => {
        if (type === 'public' || type === 'private') {
            await HTTP.put(`/application/${id}/public`, {
                public: type === 'public' ? 0 : 1,
            });
            getApplication();
            setDeleteModalShow(false);
        } else {
            try {
                await HTTP.delete(`/application/${id}`);
                message.success('删除成功');
                getApplication();
                setDeleteModalShow(false);
            } catch (error) {}
        }
        console.log(id);
    };
    const handleEdit = async (id: number) => {
        const result = await HTTP.get(`application/${id}`);
        setFormData({
            id: result?.data?.id,
            context: result?.data?.context,
        });
        setOpenDialog(true);
    };
    const columns = [
        {
            title: '应用名称',
            dataIndex: 'name',
            key: '1',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                const object = JSON.parse(record?.context);
                return (
                    <Flex>
                        <AIcon></AIcon>
                        <div style={{ maxWidth: '100%' }}>
                            <Flex>
                                <div>{object.application_name}</div>
                            </Flex>
                            <Flex>
                                <Sub>{object.application_url}</Sub>
                            </Flex>
                        </div>
                    </Flex>
                );
            },
        },
        {
            title: 'Kubernetes Manifest 安装来源',
            dataIndex: 'name',
            key: '2',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                const object = JSON.parse(record?.context);
                return <span>{object.source}</span>;
            },
        },
        {
            title: 'Manifest 类型',
            dataIndex: 'name',
            key: '3',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                const object = JSON.parse(record?.context);
                return <span>{object.install_type}</span>;
            },
        },
        {
            title: '创建时间',
            key: '4',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return moment(record.created_at).format('YYYY-MM-DD hh:mm:ss');
            },
        },
        {
            title: '创建者',
            key: '5',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                const user_id = record?.user_id;
                const item: UserType = userList.find((el: UserType) => el.id === user_id) || {
                    name: '',
                };
                return <span>{item?.name}</span>;
            },
        },
        {
            title: '操作',
            width: '100px',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const index = args[2];
                const record = args[1];
                return (
                    <div>
                        <FormOutlined onClick={() => handleEdit(record.id)} />
                        <Popover
                            trigger="click"
                            placement="bottom"
                            visible={index === popVisibleIndex}
                            onVisibleChange={(v) => setPopVisibleIndex(v ? index : -1)}
                            content={
                                <Fragment>
                                    <DeleteModal
                                        title={
                                            type === 'delte'
                                                ? '你确认要删除应用？'
                                                : `你确认要${
                                                      type === 'public' ? '公开' : '隐秘'
                                                  }应用？`
                                        }
                                        onCancel={() => setDeleteModalShow(false)}
                                        onConfirm={() => handleDelete(record.id)}
                                        visible={deleteModalShow}
                                        message={
                                            type === 'delte'
                                                ? '删除应用「xxxxxx」后，则该应用的所有资源将被删除。'
                                                : `${
                                                      type === 'public' ? '公开' : '隐秘'
                                                  }应用「xxxxxx」后，则该应用的所有资源将被用户可见。`
                                        }
                                    ></DeleteModal>

                                    <PopItem
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/application/authorize/${record.id}`
                                            )
                                        }
                                    >
                                        授权管理
                                    </PopItem>
                                    <PopItem
                                        onClick={() => {
                                            setDeleteModalShow(true);
                                            setPopVisibleIndex(-1);
                                            setType(record.public === 1 ? 'public' : 'private');
                                        }}
                                    >
                                        {record.public === 1 ? '公有' : '私密'}
                                    </PopItem>
                                    <PopItem
                                        onClick={() => {
                                            setDeleteModalShow(true);
                                            setPopVisibleIndex(-1);
                                            setType('delete');
                                        }}
                                    >
                                        删除
                                    </PopItem>
                                </Fragment>
                            }
                        >
                            <EllipsisOutlined></EllipsisOutlined>
                        </Popover>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            {openDialog && (
                <Dialog
                    visible={openDialog}
                    title="添加应用"
                    width={680}
                    onCancel={() => {
                        setFormData({});
                        setOpenDialog(false);
                    }}
                >
                    <CreateApplicationForm
                        onOk={() => {
                            getApplication();
                            setFormData({});
                            setOpenDialog(false);
                        }}
                        formData={formData}
                        onCancel={() => {
                            setFormData({});
                            setOpenDialog(false);
                        }}
                    ></CreateApplicationForm>
                </Dialog>
            )}

            <SummaryCard title="Application"></SummaryCard>
            <TableBox>
                <TableHeader>
                    <Filter>
                        <TableSearchInput></TableSearchInput>
                        <LabelSelect
                            label="安装来源"
                            option={applictionOptions}
                            onChange={handleSelectChange}
                        ></LabelSelect>
                    </Filter>
                    <Button
                        type="primary"
                        onClick={() => setOpenDialog(true)}
                        icon={<PlusOutlined style={{ color: '#fff' }} />}
                    >
                        {t('resources.application.add')}
                    </Button>
                </TableHeader>
                <TableWrap>
                    <Table
                        tableLayout="fixed"
                        scroll={{ x: '100%' }}
                        pagination={{
                            position: ['bottomCenter'],
                            showTotal: showTotal,
                        }}
                        dataSource={data.map((item: any) => {
                            item.key = item.id;
                            return item;
                        })}
                        columns={columns}
                    />
                </TableWrap>
            </TableBox>
        </div>
    );
}

export default Application;
