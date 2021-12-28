import styled from 'styled-components';

export const SettingWrap = styled.div`
    display: flex;
    min-height: 604px;
    background: #ffffff;

    .menu {
        width: 200px;
        border-right: 1px solid #dae1e8;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        font-weight: 600;
        color: #36435c;

        .title {
            padding: 16px 0 16px 20px;
        }

        &-list {
            font-size: 14px;

            &-item {
                height: 40px;
                padding: 0 20px;
                display: flex;
                align-items: center;
                cursor: pointer;

                &.active,
                &:hover {
                    color: #0066ff;
                    border-right: 2px solid #0066ff;
                    background: #f3f6fa;
                }
            }
        }
    }

    .content {
        flex: 1;
        padding: 0 20px;

        .title {
            padding: 16px 0;
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            font-weight: 600;
            color: #36435c;
        }
    }
`;

interface IThirdAccount {
    status: string;
}

export const ThirdAccountWrap = styled.div<IThirdAccount>`
    display: flex;
    padding: 30px 20px;
    border: 1px solid #dae1e8;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;

        .logo {
            width: 40px;
            height: 40px;
        }

        .content {
            .sub-title {
                color: #202d40;
                display: flex;
                align-items: center;

                .status {
                    margin-left: 8px;
                    padding: 4px;
                    font-size: 12px;
                    border-radius: 2px;
                    background: ${(props) =>
                        props.status === 'unAllocated' ? '#ffac52' : '#4ac285'};
                }
            }

            .desc {
                margin-top: 10px;
                font-size: 12px;
                color: #79879c;
            }
        }
    }
`;
