import styled from 'styled-components';
import { HType, FlexType } from './type';

export const Card = styled.div`
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px rgba(40, 47, 55, 0.05);
    background: #fff;
    padding: 20px 23px 23px 20px;
    position: relative;
    cursor: pointer;
    .enter {
        display: none;
    }
    &:hover {
        span {
            display: inline !important;
        }
    }
`;

export const CardBox = styled.div`
    margin-top: 16px;
`;

// eslint-disable-next-line no-undef
export const H = styled.div<HType>`
    font-size: 18px;
    font-weight: 600;
    color: rgb(54, 67, 92);
    height: 24px;
    line-height: 24px;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0px')};
    margin-right: 8px;
`;

export const Time = styled.div`
    color: rgb(121, 135, 156);
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    margin-bottom: 20px;
`;

export const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Flex = styled.div<FlexType>`
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0px')};
`;

export const AmountBox = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const Total = styled.div`
    font-size: 48px;
    font-weight: bold;
    color: rgb(54, 67, 92);
`;

export const I = styled.div`
    font-size: 14px;
    font-weight: 600;
    height: 20px;
    color: rgb(54, 67, 92);
    margin-left: 8px;
    position: relative;
    top: -18px;
`;

export const Water = styled.img`
    position: absolute;
    right: 0px;
    top: 0px;
    height: 70px;
`;

export const Dot = styled.div`
    background: rgb(218, 225, 232);
    border-radius: 10px;
    height: 18px;
    width: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    color: rgb(54, 67, 92);
`;

export const IconBox = styled.div`
    position: relative;
    position: relative;
    right: -14px;
    top: 2px;
`;

export const SvgIcon = styled.img`
    width: 80px;
    height: 80px;
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
