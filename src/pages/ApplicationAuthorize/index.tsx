import React, { useEffect, useState } from 'react';
import HTTP from '../../api/fetch';
import { Breadcrumb, Button, Table, message } from 'antd';
import { TableBox, TableHeader, TableWrap, Flex, Amount } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import { useParams, Link } from 'react-router-dom';
import Dialog from '../../components/Dialog';
import AuthorizeTree from './AuthorizeTree';
import { useTranslation } from 'react-i18next';
import CommonIcon from '../../components/CommonIcon';
import Icon from '@ant-design/icons';
import DeleteModal from '../../components/DeleteModal';
import { ReactComponent as IconUserAvater } from '../../images/icon/profile_boy.svg';
import { ReactComponent as IconNormalEdit } from '../../images/icon/icon_btn_normal_addPeople.svg';
import { ReactComponent as IconSelectedEdit } from '../../images/icon/icon_btn_elected_addPeople.svg';
import { ReactComponent as IconAdmin } from '../../images/icon/icon_label_admin.svg';
import { ReactComponent as IconAdd } from '../../images/icon/icon_btn_addPeople.svg';
import './reset.less';

function ApplicationAuthorize() {
    // /v1/application/7/users
    const [data, setData] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const urlParams = useParams<{ id: string }>();
    const [openDialog, setOpenDialog] = useState(false);
    const [copyData, setCopyData] = useState([]);
    const [filterValue, setFilterValue] = useState({ name: '' });
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const { t } = useTranslation();
    const getApplicationUser = async () => {
        const result = await HTTP.get(`/application/${urlParams.id}/users`);
        if (result.code === 0) {
            setData(result.data || []);
            setCopyData(result.data || []);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await HTTP.delete(`/application/${urlParams.id}/users`, {
                users: deleteId ? [deleteId] : selectList.map((item: { id: number }) => item.id),
            });
            message.success(t('common.message.delete'));
            getApplicationUser();
            setDeleteModalShow(false);
        } catch (error) {}
    };
    useEffect(() => {
        getApplicationUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    const handleFilterData = () => {
        const filterData = copyData.filter((item: { name: string }) => {
            const isNameValid = item.name.indexOf(filterValue.name) !== -1;
            return isNameValid;
        });
        setData(filterData);
    };
    useEffect(() => {
        handleFilterData();
    }, [filterValue]);
    const columns = [
        {
            title: t('resources.users.fields.name'),
            dataIndex: 'name',
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
                        </div>
                    </Flex>
                );
            },
        },
        {
            title: t('resources.users.fields.userType'),
            dataIndex: 'is_admin',
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
            title: t('resources.users.fields.email'),
            dataIndex: 'email',
        },
        {
            title: t('common.operation'),
            width: 120,
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return (
                    <div
                        style={{ width: '20px', height: '20px' }}
                        onClick={() => {
                            setDeleteId(record.id);
                            setDeleteModalShow(true);
                        }}
                    >
                        <CommonIcon
                            title={t('resources.application.bt.deleteAuth')}
                            HoverIcon={IconSelectedEdit}
                            NormalIcon={IconNormalEdit}
                            style={{ fontSize: '20px' }}
                        ></CommonIcon>
                    </div>
                );
            },
        },
    ];
    const filterInputConfirm = (value: string) => {
        setFilterValue({ name: value });
    };
    const rowSelection = {
        onChange: (...args: any) => {
            const selectedRows = args[1];
            setSelectList(selectedRows);
        },
    };
    return (
        <div>
            <DeleteModal
                onCancel={() => setDeleteModalShow(false)}
                onConfirm={handleDeleteUser}
                visible={deleteModalShow}
                title={t('resources.application.deleteAuth.deleteTitle')}
                message={t('resources.application.deleteAuth.info')}
            ></DeleteModal>
            {openDialog && (
                <Dialog
                    visible={openDialog}
                    title={t('resources.application.bt.addAuth')}
                    width={680}
                    onCancel={() => setOpenDialog(false)}
                >
                    <AuthorizeTree
                        onCancel={() => setOpenDialog(false)}
                        onOk={getApplicationUser}
                    ></AuthorizeTree>
                </Dialog>
            )}

            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/dashboard/application">{t('resources.application.name')}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{t('resources.application.bt.auth')}</Breadcrumb.Item>
            </Breadcrumb>
            <TableBox>
                <TableHeader>
                    <Flex>
                        <TableSearchInput
                            onConfirm={filterInputConfirm}
                            placeholder={t('resources.users.form.placeholder.name')}
                        ></TableSearchInput>
                        <Amount>
                            Coding-Repos ·&nbsp;
                            {t('resources.application.auth.amount', { amount: data.length })}
                        </Amount>
                    </Flex>

                    <Flex>
                        {selectList.length > 0 && (
                            <Button
                                icon={
                                    <Icon
                                        className="iconT"
                                        component={IconNormalEdit}
                                        style={{
                                            fontSize: '18px',
                                            height: '18px',
                                        }}
                                    ></Icon>
                                }
                                onClick={() => {
                                    setDeleteModalShow(true);
                                    setDeleteId('');
                                }}
                            >
                                {t('resources.application.bt.deleteAuth')}
                            </Button>
                        )}
                        <div style={{ marginLeft: '12px' }}>
                            <Button
                                type="primary"
                                icon={
                                    <Icon
                                        className="iconFix"
                                        component={IconAdd}
                                        style={{
                                            color: '#fff',
                                            fontSize: '18px',
                                            height: '18px',
                                        }}
                                    ></Icon>
                                }
                                onClick={() => setOpenDialog(true)}
                            >
                                {t('resources.application.bt.addAuth')}
                            </Button>
                        </div>
                    </Flex>
                </TableHeader>
                <TableWrap>
                    <Table
                        rowSelection={rowSelection}
                        scroll={{ x: '100%' }}
                        tableLayout="auto"
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

export default ApplicationAuthorize;
