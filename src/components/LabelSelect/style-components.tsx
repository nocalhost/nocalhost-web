import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    border: 1px solid rgb(218, 225, 232);
    border-radius: 4px;
    overflow: hidden;
`;

export const Label = styled.div`
    background: rgb(239, 244, 249);
    border-radius: 4px 0px 0px 4px;
    /* box-shadow: inset 1px 0px 0px 0px rgb(218, 225, 232), inset 0px -1px 0px 0px rgb(218, 225, 232),
        inset 0px 1px 0px 0px rgb(218, 225, 232); */
    height: 32px;
    padding: 0 10px;
    color: rgb(121, 135, 156);
    line-height: 32px;
    font-size: 14px;
`;
