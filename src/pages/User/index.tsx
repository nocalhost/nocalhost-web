import React, { useEffect, useState, Fragment, useContext } from 'react';
import SummaryCard from '../../components/SummaryCard';
import HTTP from '../../api/fetch';
import {
    TableBox,
    TableHeader,
    TableWrap,
    PopItem,
    Filter,
    IconBox,
    Flex,
    Sub,
} from './style-components';
import { ReactComponent as IconUserAvater } from '../../images/icon/profile_boy.svg';
import TableSearchInput from '../../components/TableSearchInput';
import { Table, Button, Popover, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import CreateUserForm from './CreateUserForm';
import { Dot } from './style-components';
import DeleteModal from '../../components/DeleteModal';
import LabelSelect from '../../components/LabelSelect';
import { useTranslation } from 'react-i18next';
import CommonIcon from '../../components/CommonIcon';
import Icon from '@ant-design/icons';
import { ReactComponent as IconNormalEdit } from '../../images/icon/icon_btn_normal_edit.svg';
import { ReactComponent as IconSelectedEdit } from '../../images/icon/icon_btn_elected_edit.svg';
import { ReactComponent as IconMore } from '../../images/icon/icon_more.svg';
import { ReactComponent as IconAdmin } from '../../images/icon/icon_label_admin.svg';
import { SelectValue, UserType } from './const';
import { UserContext } from '../../provider/appContext';
import NotData from '../../components/NotData';
import SearchNotData from '../../components/SearchNotData';

function User() {
    const [data, setData] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [copyData, setCopyData] = useState([]);
    const [filterValue, setFilterValue] = useState({ name: '', type: 'all' });
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [popVisibleIndex, setPopVisibleIndex] = useState(-1);
    const [formData, setFormData] = useState({});
    const { user } = useContext(UserContext);
    const { t } = useTranslation();
    const getUser = async () => {
        setTableLoading(true);
        const result = await HTTP.get('users', {
            filter: {},
            range: [0, 9],
            sort: ['id', 'ASC'],
        });
        setTableLoading(false);
        setData(result.data || []);
        setCopyData(result.data || []);
    };
    useEffect(() => {
        getUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
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
        const result = await HTTP.delete(`users/${id}`);
        if (result.code === 0) {
            message.success(t('common.message.delete'));
            setDeleteModalShow(false);
            getUser();
        }
    };
    const handleOkUserForm = () => {
        getUser();
        setOpenDialog(false);
        setFormData({});
    };
    const filterInputConfirm = (value: string) => {
        setFilterValue({ ...filterValue, name: value });
    };
    const handleFilterData = () => {
        const filterData = copyData.filter((item: UserType) => {
            const isNameValid = item.name.indexOf(filterValue.name) !== -1;
            const type = filterValue.type;
            switch (type) {
                case 'all':
                    return isNameValid;
                case 'admin':
                    return isNameValid && item?.is_admin === 1;
                default:
                    return isNameValid && item?.is_admin === 0;
            }
        });
        setData(filterData);
    };
    const handleSelectChange = (v: SelectValue) => {
        setFilterValue({ ...filterValue, type: v });
    };
    useEffect(() => {
        handleFilterData();
    }, [filterValue]);
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
                return (
                    <Flex>
                        <Icon component={IconUserAvater} style={{ fontSize: '32px' }}></Icon>
                        <div style={{ maxWidth: '100%', marginLeft: '10px' }}>
                            <Flex>
                                <div style={{ marginRight: '6px' }}>{record.name}</div>
                                {record.is_admin === 1 && (
                                    <CommonIcon
                                        NormalIcon={IconAdmin}
                                        title={t('resources.users.userType.admin')}
                                        style={{ fontSize: '18px' }}
                                    ></CommonIcon>
                                )}
                            </Flex>
                            <Flex>
                                <Sub>{record.email}</Sub>
                            </Flex>
                        </div>
                    </Flex>
                );
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
            width: 160,
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const index = args[2];
                const record = args[1];
                return (
                    <div style={{ display: 'flex' }}>
                        <IconBox onClick={() => handleEdit(record.id)}>
                            <CommonIcon
                                // title={t('common.bt.edit')}
                                HoverIcon={IconSelectedEdit}
                                NormalIcon={IconNormalEdit}
                                style={{ fontSize: '20px' }}
                            ></CommonIcon>
                        </IconBox>
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
                            <Icon component={IconMore} style={{ fontSize: '20px' }} />
                        </Popover>
                    </div>
                );
            },
        },
    ];
    !user.is_admin && columns.splice(columns.length - 1, 1);
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
                    {data.length === 0 && !tableLoading ? (
                        !filterValue.name ? (
                            <NotData></NotData>
                        ) : (
                            <SearchNotData></SearchNotData>
                        )
                    ) : (
                        <Table
                            scroll={{ x: '100%' }}
                            loading={tableLoading}
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
                    )}
                </TableWrap>
            </TableBox>
        </div>
    );
}

export default User;
