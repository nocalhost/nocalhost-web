import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

const BreadCardBox = styled.div`
    display: flex;
    margin-bottom: 12px;
    font-size: 14px;
    color: #79879c;

    span {
        &:nth-child(1) {
            margin-right: 8px;
            cursor: pointer;
        }

        &:nth-child(2) {
            margin-left: 8px;
            color: #36435c;
        }
    }
`;

interface PropData {
    menu: string;
    subMenu: string;
    route: string;
}

const BreadCard = ({ data }: { data: PropData }) => {
    const history = useHistory();
    return (
        <BreadCardBox>
            <span onClick={() => history.push(data.route)}>{data.menu}</span>/
            <span>{data.subMenu}</span>
        </BreadCardBox>
    );
};

export default BreadCard;
