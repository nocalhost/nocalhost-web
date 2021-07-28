import styled from 'styled-components';

export const Box = styled.div`
    min-height: 100vh;
    background-image: linear-gradient(180deg, #0078f9 0%, #fff 200%);
`;

export const LoginHeader = styled.div`
    height: 60px;
    display: flex;
    padding: 0 20px;
    background: rgba(9, 10, 10, 0.7);
    align-items: center;
    justify-content: space-between;
`;

export const Card = styled.div`
    width: 100%;
    /* display: flex; */
    padding: 36px 40px 40px;
    max-width: 440px;
    background: #fff;
    box-shadow: 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 6px 10px 0px rgb(0 0 0 / 10%);
    box-sizing: border-box;
    border-radius: 20px;
    margin: 140px auto;
`;
