import styled from 'styled-components';
// eslint-disable-next-line no-undef
export const MainContent = styled.div<{ expand: boolean }>`
    background-color: ${(props) => props.theme.mainBgColor};
    width: ${(props) => (props.expand ? '220px' : '72px')};
    height: calc(100vh - 68px);
    overflow: hidden;
    /* min-height: 100%;
    max-height: 100vh; */
    padding-top: 12px;
    position: relative;
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    margin-right: ${(props) => (props.expand ? '24px' : '0px')};
    padding: 12px 16px 0;
`;

// eslint-disable-next-line no-undef
export const ListItem = styled.div<{ isActive: boolean | undefined }>`
    height: 40px;
    /* padding: 0 16px; */
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    &:hover {
        background: rgb(0, 128, 255, 0.08);
        border-radius: 4px;
    }
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    > a {
        color: ${(props) => (props.isActive ? '#0080ff' : '#36435c')};
        display: flex;
        align-items: center;
        font-weight: ${(props) => (props.isActive ? 600 : 400)};
        width: 100%;
        height: 100%;
        padding: 0px 10px;
    }
`;
// eslint-disable-next-line no-undef
export const Bottom = styled.div<{ expand: boolean }>`
    position: absolute;
    bottom: 0px;
    left: 16px;
    border-top: 1px solid rgb(218, 225, 232);
    height: 64px;
    width: calc(100% - 32px);
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.expand ? 'flex-end' : 'center')};
`;
// eslint-disable-next-line no-undef
export const Label = styled.div<{ expand: boolean }>`
    margin-left: 12px;
    opacity: ${(props) => (props.expand ? 1 : 0)};
`;
