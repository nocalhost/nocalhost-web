import styled from 'styled-components';

export const ContentTitle = styled.div`
    height: 32px;
    margin: 16px 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const ClusterCount = styled.span`
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin-left: 6px;
    display: inline-block;
    background: rgb(218, 225, 232);
    border-radius: 10px;
    color: rgb(54, 67, 92);
    text-align: center;
    font-size: 12px;
`;

export const LoadingBox = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 8px;
`;
