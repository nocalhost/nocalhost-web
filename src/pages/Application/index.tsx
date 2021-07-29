import React, { useEffect, useState, Fragment } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { Table, Button, Popover } from 'antd';
import HTTP from '../../api/fetch';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import { TableBox, TableHeader, TableWrap, PopItem, Filter } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import moment from 'moment';
import CreateApplicationForm from './CreateApplicationForm';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../../components/DeleteModal';
import LabelSelect from '../../components/LabelSelect';
import { applictionOptions } from './const';

function Application() {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [popVisibleIndex, setPopVisibleIndex] = useState(-1);
    // const [selectId, setSelectId] = useState('');
    const { t } = useTranslation();
    // const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const getApplication = async () => {
            const result = await HTTP.get('application', {
                filter: {},
                range: [0, 9],
                sort: ['id', 'ASC'],
            });
            setData(result.data || []);
        };
        getApplication();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    const handleSelectChange = (v: any) => {
        console.log(v);
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
                return <div>{object.application_name}</div>;
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
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const index = args[2];
                return (
                    <div>
                        <Popover
                            trigger="click"
                            placement="bottom"
                            visible={index === popVisibleIndex}
                            onVisibleChange={(v) => setPopVisibleIndex(v ? index : -1)}
                            content={
                                <Fragment>
                                    <DeleteModal
                                        onCancel={() => setDeleteModalShow(false)}
                                        visible={deleteModalShow}
                                        message="你确认要公开该应用「devpool」吗？"
                                    ></DeleteModal>
                                    <PopItem>授权管理</PopItem>
                                    <PopItem>公有</PopItem>
                                    <PopItem
                                        onClick={() => {
                                            setDeleteModalShow(true);
                                            setPopVisibleIndex(-1);
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
            <Dialog
                visible={openDialog}
                title="添加应用"
                width={680}
                onCancel={() => setOpenDialog(false)}
            >
                <CreateApplicationForm
                    onCancel={() => setOpenDialog(false)}
                ></CreateApplicationForm>
            </Dialog>
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
