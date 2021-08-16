import styled from 'styled-components';

export const Main = styled.div`
    width: 100%;
    display: none;
    /* height: 100%; */
`;

export const IconBox = styled.div`
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(239, 244, 249);
    border-radius: 50%;
    width: 48px;
    height: 48px;
`;

export const Card = styled.div`
    height: 176px;
    width: 100%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px rgba(40, 47, 55, 0.05);
`;

export const CardTop = styled.div`
    border-bottom: 1px solid rgb(243, 246, 250);
    height: 88px;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;

export const CardInfo = styled.div`
    padding-left: 16px;
`;

export const CardInfoTitle = styled.div`
    color: rgb(54, 67, 92);
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
`;

export const CardInfoSub = styled.div`
    color: rgb(121, 135, 156);
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
`;
