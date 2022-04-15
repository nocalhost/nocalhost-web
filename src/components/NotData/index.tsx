import React from 'react';
import notDataImg from '../../images/icon/image_emptyData.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const NotDataSection = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

function NotData(props: { msg?: string }) {
    const { t } = useTranslation();
    const msg = props.msg ?? t('common.noData');
    return (
        <NotDataSection>
            <Img src={notDataImg}></Img>
            <H>{msg}</H>
        </NotDataSection>
    );
}

export default NotData;
