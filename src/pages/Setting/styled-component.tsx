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

export const ThirdAccountWrap = styled.div`
    display: flex;
    padding: 30px 20px;
    border: 1px solid #dae1e8;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;
    }
`;
