import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Table } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { omit } from 'lodash';

import Container, { ImportContext, UserItem } from '../../User/Import/util';
import BreadCard from '../../../components/BreadCard';
import Result from '../../User/Import/result';
import { ImportBox } from '../../User/Import';
import { ReactComponent as selectIcon } from './asset/file.svg';
import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import link from './asset/devspace.yaml';
import { Tailwind } from '../../../components/Tailwind/style-components';
import NSImport from './nsImport';
import { ImportStateType } from '../../User/Import/types';
import HTTP from '../../../api/fetch';
import { downloadBlob } from '../../../utils';

type ItemType = {
    clusterName: string;
    namespace: string;
    errInfo: string;
    Success: boolean;
};

function FailList(props: { result: ImportStateType<ItemType>['result'] }) {
    const { t } = useTranslation();

    const columns: ColumnsType<ItemType> = [
        {
            title: t('resources.devSpace.fields.namespace'),
            dataIndex: 'ClusterName',
            key: 'ClusterName',
            render(_, record) {
                return `${record.clusterName}-${record.namespace}`;
            },
        },
        {
            title: t('resources.users.fields.reason'),
            key: 'errInfo',
            dataIndex: 'errInfo',
            fixed: 'right',
        },
    ];

    return (
        <Table
            style={{ marginTop: 14 }}
            pagination={false}
            rowKey={(record) => record.clusterName + record.namespace}
            columns={columns}
            dataSource={props.result.filter((item) => !item.Success)}
        />
    );
}

const ImportDevSpace = () => {
    const { t } = useTranslation();

    const [state, setState] = useState<ImportStateType>({ result: [] });

    const onImport = useCallback((file: File) => {
        const fd = new FormData();
        fd.append('upload', file);

        return HTTP.fetch<{ taskId: string }>('dev_space/ns_batch_import', fd, {
            config: { is_v2: true },
        }).then((res) => {
            setState({ taskId: res.data!.taskId, file, result: [] });
        });
    }, []);
    const getProcess = useCallback(async () => {
        const {
            data: { Process, Items },
        } = await HTTP.get<{
            Process: number;
            Items: Array<UserItem>;
        }>(`dev_space/ns_import_status/${state.taskId}`, null, {
            is_v2: true,
        });

        if (Process === 1) {
            setState({ file: undefined, taskId: undefined, result: Items ?? [] });
        }

        return Promise.resolve(Process * 100);
    }, [state.taskId]);

    const downloadList = useCallback(() => {
        import('js-yaml').then((yaml) => {
            const str = yaml.dump({
                devspaces: state.result
                    .filter((item) => !item.Success)
                    .map((item) => {
                        return omit(item, 'errInfo', 'Success', 'owner');
                    }),
            });
            downloadBlob(
                new Blob([`# ${t('common.import.download.fileTips')}\n${str}`], {
                    type: 'text/plain',
                }),
                {
                    fileName: `${t('resources.devSpace.import.fail.file')}.yaml`,
                }
            );
        });
    }, [state.result]);
    return (
        <Tailwind>
            <Container>
                <BreadCard
                    data={{
                        menu: t('resources.space.name'),
                        subMenu: t('resources.devSpace.import.btn.import'),
                        route: '/dashboard/devspace',
                    }}
                />
                <Tabs defaultActiveKey="0">
                    <Tabs.TabPane tab={t('resources.devSpace.import.btn.namespace')} key="0">
                        <NSImport />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t('resources.devSpace.import.btn.yaml')} key="1">
                        <div className="import bg">
                            <div className="container">
                                <ImportContext.Provider
                                    value={{
                                        config: {
                                            icon: {
                                                select: selectIcon,
                                                default: defaultIcon,
                                            },
                                            template: {
                                                name: `${t(
                                                    'resources.devSpace.import.template.file'
                                                )}.yaml`,
                                                link: link,
                                                accept: '.yaml',
                                                suffix: ['yaml'],
                                            },
                                            complete: {
                                                link: '/dashboard/devspace',
                                                text: `${t('resources.space.name')}${t(
                                                    'common.import.result.successfully'
                                                )}`,
                                            },
                                            getProcess,
                                            onImport,
                                            downloadList,
                                            failList: <FailList result={state.result} />,
                                        },

                                        state,
                                        setState: (state) => {
                                            setState((prevState) => {
                                                return { ...prevState, ...state };
                                            });
                                        },
                                    }}
                                >
                                    {(state.result.length && <Result />) || <ImportBox t={t} />}
                                </ImportContext.Provider>
                            </div>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </Container>
        </Tailwind>
    );
};

export default ImportDevSpace;
