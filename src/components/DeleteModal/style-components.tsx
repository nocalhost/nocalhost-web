import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    margin-bottom: 16px;
    padding-left: 30px;
    position: relative;
`;

export const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: rgb(39, 58, 83);
`;

export const Message = styled.div`
    color: rgb(39, 58, 83);
    font-size: 14px;
    font-weight: 400;
    padding-left: 30px;
`;

export const ButtonBox = styled.div`
    display: flex;
    margin-top: 24px;
    padding-left: 30px;
    justify-content: flex-end;
`;

export const IconBox = styled.div`
    width: 30px;
    height: 30px;
    background: rgb(255, 251, 230);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -10px;
    top: -2px;

    & g {
        fill: #faad14;
    }
`;
