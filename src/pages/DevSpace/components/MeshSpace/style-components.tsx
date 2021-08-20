import styled from 'styled-components';

export const ContentWrap = styled.div`
    display: flex;
    padding: 24px;

    min-height: 772px;
    margin-right: 24px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(40, 47, 55, 0.05);

    .left {
        width: 420px;
        padding-right: 24px;
        position: relative;

        .ant-steps-item-title {
            font-size: 12px;
        }

        .ant-form-item-control-input {
            box-shadow: none;
        }

        .header-box {
            padding: 0 12px 12px;
            background: #f9fbfd;
            border-radius: 4px;
        }

        .resource-limit {
            padding: 12px;
            background: #f9fbfd;

            .resource-limit-check {
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
                align-items: center;

                .ant-form-item {
                    margin-bottom: 0;
                }

                .limit-desc {
                    display: flex;

                    .desc-main {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }

        .btn-box {
            width: 100%;
            position: absolute;
            padding-right: 24px;
            left: 0;
            bottom: 0;
            display: flex;
            background: #ffffff;
            justify-content: flex-end;
        }
    }

    .right {
        flex: 1;
        background: #ffffff;
    }
`;
