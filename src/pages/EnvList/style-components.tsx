import styled from 'styled-components';

export const FlexBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    .icon-explain {
        svg {
            &:hover {
                path {
                    fill: #79879c;
                }
            }
        }
    }
`;

export const ContentWrap = styled.div`
    background: rgb(255, 255, 255);
    box-shadow: 0 4px 8px 0 rgba(40, 47, 55, 0.05);
    border-radius: 8px;
`;
export const ContentTitle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    background: #f9fbfd;
    box-shadow: inset 0 -1px 0 0 rgb(243, 246, 250);
    border-radius: 8px 8px 0 0;
`;

export const SearchBox = styled.div`
    display: flex;
    align-items: center;
`;

export const IconBox = styled.div`
    margin-right: 20px;
`;

export const PopItem = styled.div`
    height: 40px;
    min-width: 140px;
    color: #36435c;
    background: #ffffff;
    font-size: 14px;
    padding-left: 12px;
    line-height: 40px;
    cursor: pointer;

    &:hover {
        color: #ff3f3f;
        background: rgb(255, 63, 63, 0.08);
    }
`;

export const PopContent = styled.div`
    padding: 8px 12px;
    background: #1a2433;
`;

export const OverflowItem = styled.div`
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SpaceTypeItem = styled.div<{ name: String | undefined }>`
    display: inline-flex;
    padding: 0 8px;
    height: 22px;
    align-items: center;
    border-radius: 12px;
    font-size: 12px;
    color: ${(props) => (props.name === 'IsolateSpace' ? ' #f88600' : '#0080ff')};
    background: ${(props) => (props.name === 'IsolateSpace' ? ' #ffe4c5' : '#c7e3ff')};
`;

// eslint-disable-next-line no-undef
export const Dot = styled.span<{ isActive: boolean | undefined }>`
    display: inline-block;
    background: ${(props) => (props.isActive ? 'rgb(30, 231, 231)' : '#c6d2dd')};
    height: 8px;
    width: 8px;
    border-radius: 50%;
    margin-right: 6px;
`;

export const UserBox = styled.div`
    width: 240px;
    background: #ffffff;
    border-radius: 4px;
`;

export const UserItem = styled.div<{ type: String }>`
    padding: 12px 10px;
    box-shadow: ${(props) =>
        props.type === 'cooperator' ? 'inset 0px -1px 0px 0px rgb(243, 246, 250)' : 'none'};
`;

export const UserType = styled.span`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

export const UserName = styled.div`
    padding-left: 30px;
    color: rgb(54, 67, 92);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: normal;
    word-break: break-word;
`;
