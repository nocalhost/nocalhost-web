import React from 'react';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Icon from '@ant-design/icons';

import { Button } from 'antd';

import { ReactComponent as IconSpace } from '../../../images/icon/icon_quarantine_space.svg';
import { ReactComponent as IconLink } from '../../../images/icon/icon_external_link.svg';
import { ReactComponent as ImageDevSpace } from '../../../images/icon/bg_popup_quarantine_space.svg';
import { ReactComponent as ImageMeshSpace } from '../../../images/icon/bg_popup_sharing_space.svg';

const WrapBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 10;
`;

const ContentBox = styled.div`
    width: 1052px;
    padding-top: 180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const ContentTitle = styled.div`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    font-weight: 600;
    height: 32px;
`;

const CardBox = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
`;

const CardItem = styled.div`
    width: 506px;
    height: 260px;
    display: flex;
    background: rgb(255, 255, 255);
    box-shadow: 0 3px 12px -4px rgba(0, 0, 0, 0.12), 0 0.5px 1.5px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    margin-right: 40px;

    .left {
        flex: 1;
        padding: 24px;
        display: flex;
        flex-direction: column;
    }

    .right {
        width: 240px;
        background: linear-gradient(
            -198.43494882292202deg,
            rgba(255, 245, 234, 0.45) 0%,
            rgba(238, 246, 255, 0.45) 60%,
            rgba(247, 250, 255, 0.45) 100%
        );
    }

    .title {
        display: flex;
        margin-bottom: 8px;
        color: rgb(54, 67, 92);
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: 600;
    }

    .content-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .btn-box {
            display: flex;

            a {
                margin-left: 12px;
                color: #79879c;
                cursor: pointer;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                display: flex;
                align-items: center;

                span {
                    visibility: hidden;
                }

                &:hover {
                    color: #0080ff;

                    span {
                        visibility: visible;
                    }
                }
            }
        }
    }

    .content {
        color: rgb(121, 135, 156);
        font-family: PingFangSC-Regular;
        font-size: 12px;
        font-weight: normal;
    }

    &:nth-child(2) {
        box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.12), 0 0.5px 1.5px 0 rgba(0, 0, 0, 0.08);
        margin-right: 0;
    }
`;

const ChooseType = ({
    onCreateDev,
    onCreateMesh,
}: {
    onCreateDev: () => void;
    onCreateMesh: () => void;
}) => {
    const { t } = useTranslation();
    return (
        <WrapBox>
            <ContentBox>
                <ContentTitle>{t('resources.devSpace.tips.chooseType')}</ContentTitle>

                <CardBox>
                    <CardItem>
                        <div className="left">
                            <div className="title">
                                <Icon
                                    component={IconSpace}
                                    style={{ fontSize: 32, marginRight: 10 }}
                                />
                                {t('resources.devSpace.actions.createDev')}
                            </div>
                            <div className="content-box">
                                <div className="content">
                                    {t('resources.devSpace.tips.devSpaceDesc')}
                                </div>
                                <div className="btn-box">
                                    <Button onClick={() => onCreateDev()} type="primary">
                                        {t('common.bt.select')}
                                    </Button>
                                    <a>
                                        {t('resources.devSpace.tips.learnMore')}
                                        <Icon
                                            component={IconLink}
                                            style={{ fontSize: 20, marginLeft: 2 }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <ImageDevSpace />
                        </div>
                    </CardItem>
                    <CardItem>
                        <div className="left">
                            <div className="title">
                                <Icon
                                    component={IconSpace}
                                    style={{ fontSize: 32, marginRight: 10 }}
                                />
                                {t('resources.devSpace.actions.createMesh')}
                            </div>
                            <div className="content-box">
                                <div className="content">
                                    {t('resources.devSpace.tips.meshSpaceDesc')}
                                </div>
                                <div className="btn-box">
                                    <Button onClick={() => onCreateMesh()} type="primary">
                                        {t('common.bt.select')}
                                    </Button>
                                    <a>
                                        {t('resources.devSpace.tips.learnMore')}
                                        <Icon
                                            component={IconLink}
                                            style={{ fontSize: 20, marginLeft: 2 }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <ImageMeshSpace />
                        </div>
                    </CardItem>
                </CardBox>
            </ContentBox>
        </WrapBox>
    );
};

export default ChooseType;