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
    }

    .time-item {
        color: #36435c;
        padding: 0 8px;

        &:nth-child(2n + 1) {
            margin-right: 4px;
        }

        .icon {
            display: flex;
            align-items: center;
        }
    }

    .add-item {
        justify-content: center;
        position: relative;
    }

    .time-panel {
        background: #ffffff;
    }
`;
