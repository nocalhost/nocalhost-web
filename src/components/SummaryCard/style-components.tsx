import styled from 'styled-components';

export const Main = styled.div`
    width: 100%;
    /* display: none; */
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
    flex-shrink: 0;
`;

export const Card = styled.div`
    /* height: 176px; */
    width: 100%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px rgba(40, 47, 55, 0.05);
`;

export const CardTop = styled.div`
    /* height: 88px; */
    display: flex;
    align-items: center;
    padding: 20px;
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

export const CardLinkBox = styled.a`
    border-top: 1px solid rgb(243, 246, 250);
    color: rgb(54, 67, 92);
    height: 44px;
    line-height: 44px;
    display: flex;
    padding-left: 20px;
    align-items: center;
    width: 100%;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    &:hover {
        background: rgb(243, 246, 250);
        color: rgb(54, 67, 92);
        overflow: hidden;
        span {
            display: block;
        }
    }
`;

export const KubeIconIn = styled.img`
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
`;

export const IconRight = styled.span`
    margin-left: 2px;
    display: none;
`;
