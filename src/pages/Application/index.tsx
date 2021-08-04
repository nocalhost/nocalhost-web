import React, { useEffect, useState, Fragment } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { Table, Button, Popover, message } from 'antd';
import HTTP from '../../api/fetch';
import { PlusOutlined } from '@ant-design/icons';
import { FormOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import Icon from '@ant-design/icons';
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
// import { applictionOptions } from './const';
import { useHistory } from 'react-router-dom';
import { UserType } from '../User/const';
import { ReactComponent as IconActive } from '../../images/icon/icon_active.svg';

function Application() {
    const [data, setData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [popVisibleIndex, setPopVisibleIndex] = useState(-1);
    const [type, setType] = useState('');
    const [formData, setFormData] = useState({});
    const history = useHistory();
    const [filterValue, setFilterValue] = useState('');
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
    const filterInputConfirm = (value: string) => {
        setFilterValue(value);
        console.log(filterValue);
    };
    const applictionOptions = [
        { value: 'all', text: t('common.select.all') },
        { value: 'git', text: 'Git' },
        { value: 'helm_repo', text: 'Helm' },
        { value: 'local', text: 'Local' },
    ];
    const columns = [
        {
            title: t('resources.application.fields.application_name'),
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
            title: t('resources.application.fields.source'),
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
            title: t('resources.application.fields.install_type'),
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
            title: t('resources.application.fields.created_date'),
            key: '4',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return moment(record.created_at).format('YYYY-MM-DD hh:mm:ss');
            },
        },
        {
            title: t('resources.application.fields.user'),
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
            title: t('common.operation'),
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
                                            type === 'delete'
                                                ? t('resources.application.delete.deleteTitle')
                                                : type === 'public'
                                                ? t('resources.application.auth.public.title')
                                                : t('resources.application.auth.private.title')
                                        }
                                        onCancel={() => setDeleteModalShow(false)}
                                        onConfirm={() => handleDelete(record.id)}
                                        visible={deleteModalShow}
                                        message={
                                            type === 'delete'
                                                ? t('resources.application.delete.info')
                                                : type === 'public'
                                                ? t('resources.application.auth.public.info')
                                                : t('resources.application.auth.private.info')
                                        }
                                    ></DeleteModal>

                                    <PopItem
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/application/authorize/${record.id}`
                                            )
                                        }
                                    >
                                        {t('resources.application.bt.auth')}
                                    </PopItem>
                                    <PopItem
                                        onClick={() => {
                                            setDeleteModalShow(true);
                                            setPopVisibleIndex(-1);
                                            setType(record.public === 1 ? 'public' : 'private');
                                        }}
                                    >
                                        {record.public === 1
                                            ? t('resources.application.auth.bt.public')
                                            : t('resources.application.auth.bt.private')}
                                    </PopItem>
                                    <PopItem
                                        onClick={() => {
                                            setDeleteModalShow(true);
                                            setPopVisibleIndex(-1);
                                            setType('delete');
                                        }}
                                    >
                                        {t('common.bt.delete')}
                                    </PopItem>
                                </Fragment>
                            }
                        >
                            <Icon component={IconActive} />
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
                    title={t('resources.application.bt.add')}
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
                        <TableSearchInput
                            onConfirm={filterInputConfirm}
                            placeholder={t('resources.application.form.placeholder.search')}
                        ></TableSearchInput>
                        <LabelSelect
                            label={t('resources.application.fields.source')}
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