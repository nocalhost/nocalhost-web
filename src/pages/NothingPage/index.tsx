import React from 'react';
import dataError from '../../images/icon/image_dataErrow.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    /* justify-content: center; */
    padding-top: 120px;
    flex-direction: column;
    align-items: center;
`;

const Svg = styled.img`
    width: 308px;
    height: 190px;
`;

const H = styled.div`
    color: rgb(121, 135, 156);
    font-size: 14px;
    font-weight: normal;
    text-align: center;
`;

function NothingPage() {
    const { t } = useTranslation();
    return (
        <Div>
            <Svg src={dataError}></Svg>
            <H>{t('nh.nothing')}</H>
        </Div>
    );
}

export default NothingPage;
