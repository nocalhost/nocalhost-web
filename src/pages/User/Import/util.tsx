import styled from 'styled-components';
import React, { useContext } from 'react';

import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import { AsyncEmptyFunction, EmptyFunction, ImportContextType } from './types';

const Container = styled.div`
    .bg {
        background-color: #fff;
    }

    & .import {
        display: flex;
        justify-content: center;
    }

    .container {
        width: 65%;
        padding-bottom: 26px;

        strong {
            font-style: normal;
            color: #36435c;
        }
    }

    .mask {
        position: absolute;
        z-index: 99;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(248, 248, 249, 0.9);
    }

    .block {
        padding: 20px;
        background: #f7f8f9;
        border-radius: 4px;

        strong {
            line-height: 20px;
        }

        p {
            margin-top: 4px;
            line-height: 20px;
        }
    }

    .upload {
        display: flex;
        align-items: center;
        padding: 28px 20px;
        position: absolute;
        z-index: 100;
        width: 92%;
        height: 128px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: #ffffff;

        box-shadow: 0 8px 24px rgba(9, 30, 66, 0.1), 0 0 1px rgba(9, 30, 66, 0.05),
            0 2px 7px rgba(9, 30, 66, 0.04);
        border-radius: 8px;

        & > div {
            flex: 1;
        }

        p {
            color: #36435c;
        }

        i {
            position: relative;
            display: block;
            height: 4px;
            width: 100%;
            background: #dae1e8;
            border-radius: 100px;

            &:before {
                content: ' ';
                position: absolute;
                height: 100%;
                width: var(--progress);
                background: #0080ff;
            }
        }
    }

    .select {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        height: 208px;
        background: #ffffff;
        border: 1px dashed #dae1e8;
        box-sizing: border-box;
        border-radius: 4px;

        &:hover {
            border: 1px dashed #0080ff;
        }

        .button {
            margin-bottom: 8px;
        }
    }

    .ant-table table {
        word-break: break-all;
    }

    .ant-table-thead {
        box-shadow: none;

        tr {
            th {
                background: #f7f8f9;
                color: #79879c;
            }
        }
    }

    .ant-tabs-nav {
        margin-bottom: 0;
        background: #f9fbfd;
        box-shadow: inset 0px -1px 0px #f3f6fa;
    }

    .ant-tabs-nav-wrap {
        margin-left: 20px;
    }

    .ant-tabs-tab {
        padding: 17px 0;
        font-size: 16px;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #1890ff;
    }

    .ant-tabs-ink-bar {
        background: #1890ff;
    }

    .success {
        margin: 15vh 0;
        height: 260px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .table-info {
        margin: 16px 0;
        padding: 20px;
        border: 1px solid #dae1e8;
        box-sizing: border-box;
        border-radius: 4px;

        & > div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        p {
            margin-bottom: 0;
        }
    }

    .info {
        display: flex;
        height: 72px;
        align-items: center;
        background-color: #f7f8f9;
        border-radius: 4px;

        div {
            position: relative;
            flex: 1;
            display: flex;
            align-content: center;
            justify-content: center;

            &:first-child:before {
                position: absolute;
                content: ' ';
                top: -5px;
                height: 32px;
                right: 0;
                border: 1px solid #dae1e8;
            }
        }

        svg {
            margin-right: 6px;
        }
    }

    .ns {
        padding-bottom: 20px;

        .header {
            padding: 10px 20px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .ant-table-thead {
            box-shadow: 0px 4px 8px rgba(40, 47, 55, 0.03);
        }

        .ant-table-thead tr th {
            background: #ffffff;
        }
    }
`;

export type UserItem = {
    Success: boolean;
    Email: string;
    Username: string;
    CooperatorDevSpace: string;
    ViewerDevSpace: string;
    ErrInfo: string;
};
export const ImportContext = React.createContext<ImportContextType<any>>({
    state: { result: [] },
    setState: EmptyFunction,
    config: {
        template: {
            name: '',
            link: '',
            accept: '',
            suffix: [],
        },
        icon: {
            default: defaultIcon,
            select: defaultIcon,
        },
        complete: {
            link: '',
            text: '',
        },
        onImport: AsyncEmptyFunction,
        getProcess: () => Promise.resolve(0),
        downloadList: EmptyFunction,
        failList: <></>,
    },
});

export function getUserImportContext() {
    return useContext(ImportContext);
}

export default Container;
