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

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const Amount = styled.div`
    color: rgb(54, 67, 92);
    font-size: 14px;
    margin-left: 20px;
`;

export const BtnIcon = styled.i`
    position: relative;
    top: 1px;
`;
