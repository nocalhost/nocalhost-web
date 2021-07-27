import styled from 'styled-components';
export const Logo = styled.img`
    width: 37px;
    height: 24px;
`;

export const MainContent = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
    width: 100%;
    height: 60px;
    padding: 18px 8px 18px 20px;
`;

export const LogoName = styled.div`
    /* width: 123px; */
    height: 20px;
    color: rgb(54, 67, 92);
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    letter-spacing: 0px;
    padding-left: 8px;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;
