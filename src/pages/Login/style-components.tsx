import styled from 'styled-components';
import bgLogo from '../../images/loginBg.png';
import cardLogo from '../../images/cardBg.png';

export const Box = styled.div`
    min-height: 100vh;
    background-image: url(${cardLogo});
    background-size: cover;
    background-color: #eff4f9;
    /* background: radial-gradient(
        ellipse 100% 0% at 0% 0%,
        rgba(190, 104, 234, 0.13) 0%,
        rgb(49, 108, 247) 100%
    ); */
`;

export const LoginHeader = styled.div`
    height: 60px;
    display: flex;
    padding: 0 20px;
    /* background: rgba(9, 10, 10, 0.7); */
    align-items: center;
    justify-content: space-between;
`;

export const Card = styled.div`
    background-color: #fff;
    background-image: url(${bgLogo});
    background-size: cover;
    border-radius: 4px;
    /* height: 366px; */
    width: 440px;
    padding: 30px 40px;
    margin: 30px auto;
`;

export const Title = styled.div`
    margin: 100px auto 0;
    text-align: center;
`;

export const AdminCount = styled.div`
    color: rgb(0, 128, 255);
    font-size: 14px;
    font-weight: normal;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.img`
    width: 37px;
    height: 24px;
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

export const DocBox = styled.div`
    height: 32px;
    width: 90px;
    background: rgb(255, 255, 255);
    border-radius: 4px;
    box-shadow: 0px 2px 4px 0px rgba(54, 67, 92, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
