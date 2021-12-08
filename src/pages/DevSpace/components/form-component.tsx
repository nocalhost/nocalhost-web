import styled from 'styled-components';

export const TimePicker = styled.div`
    width: 408px;
    display: flex;
    flex-wrap: wrap;

    .time-item,
    .add-item {
        width: 202px;
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

        &:hover {
            border: 1px solid rgb(0, 128, 255);
            box-shadow: 0 0 4px 0 rgba(0, 128, 255, 0.5);
        }

        &:nth-child(2n + 1) {
            margin-right: 4px;
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