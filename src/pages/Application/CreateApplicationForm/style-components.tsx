import styled from 'styled-components';

export const FormBox = styled.div`
    width: 100%;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

export const ButtonBox = styled.div`
    margin-left: 12px;
`;

export const AddInputBtn = styled.div`
    background: rgb(255, 255, 255);
    border-radius: 4px;
    border: 1px dashed rgb(218, 225, 232);
    width: 100%;
    display: flex;
    justify-content: center;
    height: 32px;
    align-items: center;
    cursor: pointer;
    color: rgb(54, 67, 92);
`;

// eslint-disable-next-line no-undef
export const DirBox = styled.div<{ isShow: boolean }>`
    & .ant-form-item-control {
        display: ${(props) => (props.isShow ? 'flex' : 'none')} !important;
    }
`;
