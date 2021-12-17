import styled from 'styled-components';
import { HType, FlexType } from './type';

export const NormalCard = styled.div<HType>`
    border-radius: 4px;
    height: ${(props) => (props.height ? props.height : 'auto')};
    background: ${(props) => (props.bg ? props.bg : '#fff')};
    padding: 20px;
    position: relative;
    cursor: pointer;

    .enter {
        svg {
            &:hover {
                path {
                    fill: #36435c;
                }
            }
        }
    }
`;

export const Card = styled(NormalCard)<HType>`
    height: ${(props) => (props.height ? props.height : 'auto')};

    .enter {
        display: inline-block;
        height: 20px;
        visibility: hidden;
    }

    &:hover {
        border-radius: 4px;
        border: 1px solid rgb(226, 232, 238);
        box-shadow: 0 4px 10px 0 rgba(54, 67, 92, 0.12);

        span {
            visibility: visible !important;
        }
    }
`;

export const DataCard = styled(Card)`
    height: 98px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #f9fbfd;
    padding-bottom: 16px;
`;

export const CardBox = styled.div`
    margin-top: 16px;
`;

// eslint-disable-next-line no-undef
export const H = styled.div<HType>`
    font-size: 12px;
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
    font-family: ${(props) => (props.bold ? 'PingFangSC-Semibold' : 'PingFangSC-Regular')};
    color: rgb(54, 67, 92);
    display: flex;
    align-items: center;
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
    font-size: 32px;
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
    right: -14px;
    top: 2px;
`;

export const SvgIcon = styled.img`
    width: 48px;
    height: 48px;
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

export const SleepingBox = styled.div`
    margin-left: 6px;
    padding: 0 8px;
    height: 20px;
    display: flex;
    background: #e6eaee;
    border-radius: 11px;
    align-items: center;
    font-size: 14px;
    color: #36435c;
`;
