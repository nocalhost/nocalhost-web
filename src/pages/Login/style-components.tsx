import styled from 'styled-components';

export const Box = styled.div`
    min-height: 100vh;
    background: radial-gradient(
        ellipse 100% 0% at 0% 0%,
        rgba(190, 104, 234, 0.13) 0%,
        rgb(49, 108, 247) 100%
    );
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
    background: radial-gradient(
        ellipse 100% 0% at 0% 0%,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.77) 67%,
        rgb(255, 255, 255) 100%
    );
    border-radius: 0px;
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
