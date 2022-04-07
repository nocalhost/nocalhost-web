import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Container, { ImportContext } from '../../User/Import/util';
import BreadCard from '../../../components/BreadCard';
import Result from '../../User/Import/result';
import { ImportBox } from '../../User/Import';
import { ReactComponent as selectIcon } from './asset/file.svg';
import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import link from './asset/devspace.yaml';

const ImportDevSpace = () => {
    const { t } = useTranslation();

    const [file, setFile] = useState<File>();
    const [result, setResult] = useState<number>(-1);
    const [taskId, setTaskId] = useState(-1);

    return (
        <Container>
            <BreadCard
                data={{
                    menu: t('resources.space.name'),
                    subMenu: '导入开发空间',
                    route: '/dashboard/devspace',
                }}
            />
            <div className="import">
                <div className="container">
                    <ImportContext.Provider
                        value={{
                            icon: {
                                select: selectIcon,
                                default: defaultIcon,
                            },
                            template: {
                                name: '开发空间导入模版.yaml',
                                link: link,
                            },
                            file,
                            taskId,
                            setTaskId,
                            setFile,
                            setResult,
                            result,
                        }}
                    >
                        {(result > -1 && <Result />) || <ImportBox t={t} />}
                    </ImportContext.Provider>
                </div>
            </div>
        </Container>
    );
};

export default ImportDevSpace;
