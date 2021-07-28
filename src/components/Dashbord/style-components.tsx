import styled from 'styled-components';

export const MainContent = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
    width: 220px;
    height: calc(100vh - 60px);
    padding-top: 12px;
`;

// eslint-disable-next-line no-undef
export const ListItem = styled.div<{ isActive: boolean | undefined }>`
    height: 40px;
    padding: 0 16px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    > a {
        color: ${(props) => (props.isActive ? '#0080ff' : '#202d40')};
    }
`;
