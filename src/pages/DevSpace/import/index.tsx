import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import Container, { getImportContext } from '../../User/Import/util';
import BreadCard from '../../../components/BreadCard';
import Result from '../../User/Import/result';
import { ImportBox } from '../../User/Import';
import { ReactComponent as selectIcon } from './asset/file.svg';
import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import link from './asset/devspace.yaml';
import { Tailwind } from '../../../components/Tailwind/style-components';
import NSImport from './nsImport';
import { EmptyFunction, ImportStateType } from '../../User/Import/types';
import HTTP from '../../../api/fetch';

const ImportDevSpace = () => {
    const { t } = useTranslation();

    const [state, setState] = useState<ImportStateType>({ result: [] });

    const ImportContext = getImportContext();

    const onImport = useCallback((file: File) => {
        const fd = new FormData();
        fd.append('upload', file);

        return HTTP.fetch<{ taskId: string }>('users/import', fd).then((res) => {
            setState({ taskId: res.data!.taskId, file, result: [] });
        });
    }, []);
    return (
        <Tailwind>
            <Container>
                <BreadCard
                    data={{
                        menu: t('resources.space.name'),
                        subMenu: '导入开发空间',
                        route: '/dashboard/devspace',
                    }}
                />
                <Tabs defaultActiveKey="0">
                    <Tabs.TabPane tab="命名空间导入" key="0">
                        <NSImport />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Yaml文件导入" key="1">
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
                                                name: '开发空间导入模版.yaml',
                                                link: link,
                                                accept: '.yaml',
                                                suffix: ['yaml'],
                                            },
                                            complete: {
                                                link: '/dashboard/devspace',
                                                text: '成功导入 28',
                                            },
                                            getProcess: () => {
                                                return Promise.resolve(0);
                                            },
                                            onImport,
                                            downloadList: EmptyFunction,
                                            failList: <></>,
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
