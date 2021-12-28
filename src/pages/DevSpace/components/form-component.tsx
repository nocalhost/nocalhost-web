import styled from 'styled-components';

export const TimePicker = styled.div`
    width: 418px;
    display: flex;
    flex-wrap: wrap;
    font-family: PingFangSC-Regular;

    .time-item,
    .add-item {
        width: 206px;
        height: 32px;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        border: 1px solid rgb(218, 225, 232);
        background: #f3f6fa;
        color: #dae1e8;
        border-radius: 6px;
        cursor: pointer;
    }

    .time-item {
        color: #36435c;
        background: #ffffff;
        padding: 0 8px;
        display: flex;
        justify-content: space-between;

        &:hover {
            border: 1px solid rgb(0, 128, 255);
            box-shadow: 0 0 4px 0 rgba(0, 128, 255, 0.5);
        }

        &:nth-child(2n + 1) {
            margin-right: 4px;
        }

        .weekday {
            display: inline-block;
            width: 32px;
        }

        .icon {
            display: flex;
            align-items: center;

            &:hover {
                svg {
                    path {
                        fill: #79879c;
                    }
                }
            }
        }
    }

    .add-item {
        justify-content: center;
        position: relative;
        cursor: pointer;
        color: #79879c;
        border: 1px dashed rgb(218, 225, 232);

        &:hover {
            border: 1px dashed rgb(0, 128, 255);
            box-shadow: 0 0 4px 0 rgba(0, 128, 255, 0.5);
            color: #36435c;
        }

        svg {
            g {
                stroke: #79879c;
            }
        }
    }

    .time-panel {
        background: #ffffff;
    }
`;

export const RuleTip = styled.div`
    font-size: 12px;
    color: #79879c;
`;
