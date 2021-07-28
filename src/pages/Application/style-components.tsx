import styled from 'styled-components';

export const TableBox = styled.div`
    width: 100%;
    height: 100%;
    /* background: #fff; */
    padding-top: 16px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: inset 0px -1px 0px 0px rgb(243, 246, 250);
`;

export const TableWrap = styled.div`
    padding: 0 0px;
    background: #fff;
`;

export const TableHeader = styled.div`
    background: ${(props) => props.theme.mainBgColor};
    border-radius: 0px;
    padding: 0 20px;
    background: #f9fbfd;
    box-shadow: inset 0px -1px 0px 0px rgb(243, 246, 250);
    height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: space-between;
`;

export const Main = styled.div`
    width: 100%;
    height: 100%;
`;

export const Card = styled.div`
    height: 176px;
    width: 100%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px rgba(40, 47, 55, 0.05);
`;

export const PopItem = styled.div`
    height: 40px;
    min-width: 140px;
    color: #36435c;
    background: #fff;
    font-size: 14px;
    padding-left: 12px;
    line-height: 40px;
    cursor: pointer;
    &:hover {
        color: #ff3f3f;
        background: rgb(255, 63, 63, 0.08);
    }
`;
