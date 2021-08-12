import React from 'react';
import notDataImg from '../../images/icon/image_searchEmpty.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
const NotDataSection = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
`;

const Img = styled.img`
    width: 280px;
    height: 150px;
`;

const H = styled.div`
    color: rgb(121, 135, 156);
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    margin-top: 20px;
`;
function NotData() {
    const { t } = useTranslation();
    return (
        <NotDataSection>
            <Img src={notDataImg}></Img>
            <H>{t('common.noSearch')}</H>
        </NotDataSection>
    );
}

export default NotData;

// SearchNotData
