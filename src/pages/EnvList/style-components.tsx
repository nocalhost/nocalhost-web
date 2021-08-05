import styled from 'styled-components';

export const FlexBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
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

export const OverflowItem = styled.div`
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SpaceTypeItem = styled.div`
    font-size: 12px;
    box-shadow: inset 0 -1px 0 0 rgb(243, 246, 250);
    color: #0080ff;
`;
