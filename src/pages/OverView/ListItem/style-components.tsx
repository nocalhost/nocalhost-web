import styled from 'styled-components';

export const List = styled.div`
    background: rgb(243, 246, 250);
    border-radius: 4px;
    border-radius: 4px;
    height: 72px;
    /* width: 100%;
    display: flex; */
    padding: 16px 10px;
    margin-bottom: 12px;
    &:hover {
        border: 1px solid rgb(218, 225, 232);
        box-shadow: 0px 4px 10px 0px rgba(54, 67, 92, 0.12);
    }
`;

export const Icon = styled.div`
    width: 32px;
    height: 32px;
    background: red;
    margin-right: 10px;
`;

export const TextOver = styled.div`
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const H = styled(TextOver)`
    font-size: 14px;
    font-weight: 600;
    color: rgb(54, 67, 92);
`;

export const I = styled(TextOver)`
    color: rgb(121, 135, 156);
    margin-top: 2px;
    font-size: 12px;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;
