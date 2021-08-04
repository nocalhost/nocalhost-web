import React, { useEffect, useState, Fragment } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { Table, Button, Popover, message } from 'antd';
import HTTP from '../../api/fetch';
import { PlusOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import Icon from '@ant-design/icons';
import {
    TableBox,
    TableHeader,
    TableWrap,
    PopItem,
    Filter,
    Flex,
    Sub,
    IconBox,
} from './style-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import TableSearchInput from '../../components/TableSearchInput';
import moment from 'moment';
import CreateApplicationForm from './CreateApplicationForm';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../../components/DeleteModal';
import LabelSelect from '../../components/LabelSelect';
// import { applictionOptions } from './const';
import { useHistory } from 'react-router-dom';
import { UserType } from '../User/const';
import CommonIcon from '../../components/CommonIcon';
import { ReactComponent as IconNormalEdit } from '../../images/icon/icon_btn_normal_edit.svg';
import { ReactComponent as IconSelectedEdit } from '../../images/icon/icon_btn_elected_edit.svg';
import { ReactComponent as IconMore } from '../../images/icon/icon_more.svg';
import { ReactComponent as IconApplication } from '../../images/icon/icon_application.svg';
import { ReactComponent as IconColorCopy } from '../../images/icon/icon_btn_elected_copy.svg';
import { ReactComponent as IconCopy } from '../../images/icon/icon_btn_normal_copy.svg';
import { ReactComponent as IconAdmin } from '../../images/icon/icon_label_admin.svg';
import { SelectValue } from './const';

function Application() {
    const [data, setData] = useState([]);
    const [copyData, setCopyData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [filterValue, setFilterValue] = useState({ name: '', type: 'all' });
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
            setCopyData(result.data || []);
        } catch (error) {}
    };
    useEffect(() => {
        getApplication();
        getUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
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
    };
    const handleFilterData = () => {
        const filterData = copyData.filter((item: { context: string }) => {
            const context = JSON.parse(item?.context);
            const isNameValid = context.application_name.indexOf(filterValue.name) !== -1;
            const type = filterValue.type;
            switch (type) {
                case 'all':
                    return isNameValid;
                case 'git':
                    return isNameValid && context?.source === 'git';
                case 'local':
                    return isNameValid && context?.source === 'local';
                default:
                    return isNameValid && context?.source === 'helm_repo';
            }
        });
        setData(filterData);
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
        setFilterValue({ ...filterValue, name: value });
    };
    const handleSelectChange = (v: SelectValue) => {
        setFilterValue({ ...filterValue, type: v });
    };
    useEffect(() => {
        handleFilterData();
    }, [filterValue]);
    const applictionOptions = [
        { value: 'all', text: t('common.select.all') },
        { value: 'git', text: 'Git' },
        { value: 'helm_repo', text: 'Helm' },
        { value: 'local', text: 'Local' },
    ];
    const onCopy = () => {
        message.success(t('nh.action.copied'));
    };
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
                        <Icon component={IconApplication} style={{ fontSize: '32px' }}></Icon>
                        <div style={{ maxWidth: '100%', marginLeft: '10px' }}>
                            <Filter>
                                <div style={{ marginRight: '8px' }}>{object.application_name}</div>
                                {record.public === 1 && (
                                    <Icon component={IconAdmin} style={{ fontSize: '18px' }}></Icon>
                                )}
                            </Filter>
                            {!!object.application_url.replace(/\s+/g, '') && (
                                <Flex>
                                    <Sub>{object.application_url}</Sub>
                                    <CopyToClipboard text={object.application_url} onCopy={onCopy}>
                                        <div style={{ height: '20px' }}>
                                            <CommonIcon
                                                title={t('nh.action.copy')}
                                                style={{ fontSize: '20px' }}
                                                HoverIcon={IconColorCopy}
                                                NormalIcon={IconCopy}
                                            ></CommonIcon>
                                        </div>
                                    </CopyToClipboard>
                                </Flex>
                            )}
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
            width: '160px',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const index = args[2];
                const record = args[1];
                const object = JSON.parse(record?.context);
                return (
                    <div style={{ display: 'flex' }}>
                        <IconBox onClick={() => handleEdit(record.id)}>
                            <CommonIcon
                                title={t('common.bt.edit')}
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
                                                ? t('resources.application.auth.public.info', {
                                                      name: object.application_name,
                                                  })
                                                : t('resources.application.auth.private.info', {
                                                      name: object.application_name,
                                                  })
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
                            <Icon component={IconMore} style={{ fontSize: '20px' }} />
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
