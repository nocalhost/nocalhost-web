import styled from 'styled-components';
import { TreeListStyleType } from '../const';

export const Content = styled.div`
    height: 400px;
    border-radius: 4px;
    border: 1px solid rgb(218, 225, 232);
    display: flex;
`;

export const Box = styled.div`
    width: 50%;
    border-right: 1px solid rgb(218, 225, 232);
    &:nth-of-type(2) {
        border-right: 0px;
    }
    padding: 12px 12px 0 12px;
`;

export const Amount = styled.div`
    color: rgb(121, 135, 156);
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: normal;
    height: 20px;
    margin: 12px 0;
`;

export const TreeList = styled.div<TreeListStyleType>`
    overflow: auto;
    height: ${(props) => props.height}px;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

export const ButtonBox = styled.div`
    margin-left: 12px;
`;
