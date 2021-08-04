import React, { useEffect, useState, Fragment } from 'react';
import SummaryCard from '../../components/SummaryCard';
import HTTP from '../../api/fetch';
import { TableBox, TableHeader, TableWrap, PopItem, Filter } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import { Table, Button, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import CreateUserForm from './CreateUserForm';
import { Dot } from './style-components';
import { EllipsisOutlined, FormOutlined } from '@ant-design/icons';
import DeleteModal from '../../components/DeleteModal';
import LabelSelect from '../../components/LabelSelect';
import { useTranslation } from 'react-i18next';

function User() {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [popVisibleIndex, setPopVisibleIndex] = useState(-1);
    const [formData, setFormData] = useState({});
    const [filterValue, setFilterValue] = useState('');
    const { t } = useTranslation();
    const getUser = async () => {
        const result = await HTTP.get('users', {
            filter: {},
            range: [0, 9],
            sort: ['id', 'ASC'],
        });
        setData(result.data || []);
    };
    useEffect(() => {
        getUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    const handleSelectChange = (v: any) => {
        console.log(v);
    };
    const handleEdit = async (id: number) => {
        const result = await HTTP.get(`users/${id}`);
        setFormData({
            status: result?.data?.status,
            is_admin: result?.data?.is_admin,
            name: result?.data?.name,
            email: result?.data?.email,
            id: result?.data?.id,
        });
        setOpenDialog(true);
    };
    const handleDelete = async (id: number) => {
        await HTTP.delete(`users/${id}`);
        setDeleteModalShow(false);
    };
    const handleOkUserForm = () => {
        getUser();
        setOpenDialog(false);
        setFormData({});
    };
    const filterInputConfirm = (value: string) => {
        setFilterValue(value);
        console.log(filterValue);
    };
    const userOptions = [
        { value: 'all', text: t('common.select.all') },
        { value: 'user', text: t('resources.users.userType.user') },
        { value: 'admin', text: t('resources.users.userType.admin') },
    ];
    const columns = [
        {
            title: t('resources.users.fields.name'),
            dataIndex: 'name',
            key: '1',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return <div>{record.name}</div>;
            },
        },
        {
            title: t('resources.users.fields.userType'),
            dataIndex: 'is_admin',
            key: '2',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return (
                    <div>
                        <span>
                            {record.is_admin === 1
                                ? t('resources.users.userType.admin')
                                : t('resources.users.userType.user')}
                        </span>
                    </div>
                );
            },
        },
        {
            title: t('resources.users.fields.status'),
            dataIndex: 'status',
            key: '3',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return (
                    <div>
                        <Dot isActive={record.status === 1}></Dot>
                        <span>
                            {record.status === 1
                                ? t('resources.users.status.active')
                                : t('resources.users.status.inactive')}
                        </span>
                    </div>
                );
            },
        },
        {
            title: t('resources.users.fields.cluster_count'),
            key: '4',
            dataIndex: 'cluster_count',
        },
        {
            title: t('common.operation'),
            key: '5',
            width: 132,
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
                                        onCancel={() => setDeleteModalShow(false)}
                                        onConfirm={() => handleDelete(record.id)}
                                        visible={deleteModalShow}
                                        title={t('resources.users.delete.deleteTitle')}
                                        message={t('resources.users.delete.info', {
                                            name: record.name,
                                        })}
                                    ></DeleteModal>
                                    <PopItem
                                        onClick={() => {
                                            setDeleteModalShow(true);
                                            setPopVisibleIndex(-1);
                                        }}
                                    >
                                        {t('common.bt.delete')}
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
                    title={
                        Object.prototype.hasOwnProperty.call(formData, 'id')
                            ? t('resources.users.bt.edit')
                            : t('resources.users.bt.add')
                    }
                    width={680}
                    onCancel={() => {
                        setOpenDialog(false);
                        setFormData({});
                    }}
                >
                    <CreateUserForm
                        onOk={handleOkUserForm}
                        onCancel={() => {
                            setOpenDialog(false);
                            setFormData({});
                        }}
                        formData={formData}
                    ></CreateUserForm>
                </Dialog>
            )}

            <SummaryCard title="User"></SummaryCard>
            <TableBox>
                <TableHeader>
                    <Filter>
                        <TableSearchInput
                            onConfirm={filterInputConfirm}
                            placeholder={t('resources.users.form.placeholder.name')}
                        ></TableSearchInput>
                        <LabelSelect
                            label={t('resources.users.fields.userType')}
                            option={userOptions}
                            onChange={handleSelectChange}
                        ></LabelSelect>
                    </Filter>

                    <Button
                        type="primary"
                        onClick={() => setOpenDialog(true)}
                        icon={<PlusOutlined style={{ color: '#fff' }} />}
                    >
                        {t('resources.users.bt.add')}
                    </Button>
                </TableHeader>
                <TableWrap>
                    <Table
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

export default User;